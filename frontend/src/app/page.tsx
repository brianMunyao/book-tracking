'use client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';

import { IBook } from '@/utils/interfaces';
import Section from '@/components/Section';
import NewBookModal from '@/components/NewBookModal';
import {
	deleteBook,
	getBooks,
	updateBookStatus,
} from '@/services/book.service';

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [books, setBooks] = useState<IBook[]>([]);

	const fetchBooks = useCallback(async () => {
		getBooks()
			.then((data) => setBooks(data))
			.catch((err) => toast.error(err));
	}, []);

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	const onModalClose = () => {
		fetchBooks();
		setIsModalOpen(false);
	};

	const handleStatusUpdate = (id: number, statusId: number) => {
		updateBookStatus(id, statusId)
			.then((newBook) =>
				toast.success('Book status updated successfully')
			)
			.then(() => fetchBooks())
			.catch((err) => toast.error(err));
	};

	const handleDeleteBook = (id: number) => {
		deleteBook(id)
			.then((newBook) => toast.success('Book deleted successfully'))
			.then(() => fetchBooks())
			.catch((err) => toast.error(err));
	};

	return (
		<>
			<main className="p-4 h-screen bg-slate-50">
				<h1 className="font-bold text-xl pb-3">Book Tracking</h1>

				<div className="grid grid-cols-3 gap-2">
					<Section
						addBtn
						title="To Read"
						books={books.filter((b) => b.status_id === 1)}
						openModal={() => setIsModalOpen(true)}
						statusUpdate={handleStatusUpdate}
						deleteBook={handleDeleteBook}
					/>

					<Section
						title="In Progress"
						books={books.filter((b) => b.status_id === 2)}
						openModal={() => setIsModalOpen(true)}
						statusUpdate={handleStatusUpdate}
						deleteBook={handleDeleteBook}
					/>

					<Section
						title="Completed"
						books={books.filter((b) => b.status_id === 3)}
						openModal={() => setIsModalOpen(true)}
						statusUpdate={handleStatusUpdate}
						deleteBook={handleDeleteBook}
					/>
				</div>
			</main>

			<NewBookModal isModalOpen={isModalOpen} closeModal={onModalClose} />
			<ToastContainer />
		</>
	);
}

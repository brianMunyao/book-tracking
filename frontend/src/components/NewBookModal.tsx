import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { addNewBook } from '@/services/book.service';

interface Props {
	isModalOpen: boolean;
	closeModal: () => void;
}

const NewBookModal = ({ isModalOpen, closeModal }: Props) => {
	const [bookName, setBookName] = useState('');
	const [bookStatus, setBookStatus] = useState(1);

	const statuses = [
		{ id: 1, status: 'To Read' },
		{ id: 2, status: 'In Progress' },
		{ id: 3, status: 'Completed' },
	];

	const handleCreateBook = () => {
		addNewBook({
			title: bookName,
			status_id: bookStatus,
		})
			.then(() => {
				toast.success('Book added successfully');
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={closeModal}
			className="w-1/2 h-min bg-white rounded z-50 p-5 outline-none"
			overlayClassName="fixed top-0 w-screen h-screen z-50 bg-black bg-opacity-40 flex justify-center align-center p-5"
		>
			<h2 className="font-bold text-lg mb-3">Add New Book</h2>

			<div className="flex flex-col gap-3">
				<div className="flex flex-col">
					<label htmlFor="new-book">Book Name</label>
					<input
						type="text"
						id="new-book"
						name="new-book"
						placeholder="Enter Book Name"
						className="outline-none border-2 border-solid border-slate-300 focus:border-slate-500 rounded p-2"
						value={bookName}
						onChange={(e) => setBookName(e.target.value)}
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="new-book">Book Status</label>
					<select
						name="status"
						id="status"
						value={bookStatus}
						className="outline-none border-2 border-solid border-slate-300 focus:border-slate-500  rounded p-2"
						onChange={(e) => setBookStatus(Number(e.target.value))}
					>
						{statuses.map((s) => (
							<option key={s.id} value={s.id}>
								{s.status}
							</option>
						))}
					</select>
				</div>
				<button
					className="mt-4 bg-slate-500 hover:bg-slate-700 text-white w-max rounded py-2 px-4"
					onClick={handleCreateBook}
				>
					Create
				</button>
			</div>
		</Modal>
	);
};

export default NewBookModal;

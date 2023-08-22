import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

import { IBook } from '@/utils/interfaces';
import Book from '@/components/Book';

interface Props {
	title: string;
	books: IBook[];
	addBtn?: boolean;
	openModal: () => void;
	statusUpdate: (id: number, statusId: number) => void;
	deleteBook: (id: number) => void;
}

const Section = ({
	addBtn,
	title,
	books,
	openModal,
	statusUpdate,
	deleteBook,
}: Props) => {
	return (
		<div className=" rounded border-2 border-dashed border-slate-200 p-2">
			<div className="flex align-middle justify-between mb-3">
				<h4 className="font-medium">{title}</h4>

				{addBtn && (
					<button className="" onClick={openModal}>
						<IoAddCircleOutline />
					</button>
				)}
			</div>

			<div className="flex flex-col gap-2">
				{books.map((b) => (
					<Book
						key={b.id}
						book={b}
						statusUpdate={statusUpdate}
						deleteBook={deleteBook}
					/>
				))}
			</div>

			{books.length === 0 && (
				<div className="pt-4 opacity-30">list empty</div>
			)}
		</div>
	);
};

export default Section;

import React, { useState } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

import { IBook } from '@/utils/interfaces';

interface Props {
	book: IBook;
	statusUpdate: (id: number, statusId: number) => void;
	deleteBook: (id: number) => void;
}

const statuses = [
	{ id: 1, status: 'To Read' },
	{ id: 2, status: 'In Progress' },
	{ id: 3, status: 'Completed' },
];

const Book = ({ book, statusUpdate, deleteBook }: Props) => {
	const [settingsOpen, setSettingsOpen] = useState(false);

	return (
		<div className="flex justify-between align-center bg-white p-3 shadow rounded">
			<span>{book.title}</span>

			<span className="relative">
				<button onClick={() => setSettingsOpen(true)}>
					<IoEllipsisVertical />
				</button>

				{settingsOpen && (
					<div
						className="border-2 border-solid border-stone-100 absolute top-0 right-0 bg-white shadow-md p-1 z-10 rounded flex flex-col w-max gap-1"
						onMouseLeave={() => setSettingsOpen(false)}
					>
						<span className="text-sm font-semibold">Move To:</span>
						{statuses
							.filter((s) => s.id != book.status_id)
							.map((s) => (
								<span
									className="hover:bg-slate-200 px-2 py-1 text-sm cursor-pointer rounded"
									key={s.id}
									onClick={() => statusUpdate(book.id, s.id)}
								>
									{s.status}
								</span>
							))}

						<span
							className="hover:text-white hover:bg-red-600 bg-red-50 text-red-600 px-2 py-1 cursor-pointer rounded"
							onClick={() => deleteBook(book.id)}
						>
							Delete
						</span>
					</div>
				)}
			</span>
		</div>
	);
};

export default Book;

import axios from 'axios';

import { IBook, INewBook } from '@/utils/interfaces';

const apiUrl = (path = '/') => 'http://localhost:8000/books' + path;

export const getBooks = async (): Promise<IBook[]> => {
	const { data } = await axios.get(apiUrl());
	return data;
};

export const getSingleBook = async (id: number): Promise<IBook[]> => {
	const { data } = await axios.get(apiUrl('/' + id));
	return data;
};

export const addNewBook = async (book: INewBook): Promise<IBook> => {
	const { data } = await axios.post(apiUrl(), book);
	return data;
};

export const updateBookStatus = async (
	id: number,
	newStatus: number
): Promise<IBook> => {
	const { data } = await axios.patch(apiUrl('/' + id + '/status'), {
		status: newStatus,
	});
	return data;
};

export const deleteBook = async (id: number): Promise<IBook> => {
	const { data } = await axios.delete(apiUrl('/' + id));
	return data;
};

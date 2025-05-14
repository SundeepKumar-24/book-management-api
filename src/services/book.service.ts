import { Book } from '../models/book.model';
import { v4 as uuidv4 } from 'uuid';

let books: Book[] = [
    { id: '1', title: '1984', author: 'George Orwell', publishedYear: 1949 },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
    { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 }
  ];
  

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: string): Book | undefined => books.find(book => book.id === id);

export const addBook = (book: Omit<Book, 'id'>): Book => {
  const newBook = { id: uuidv4(), ...book };
  books.push(newBook);
  return newBook;
};

export const updateBook = (id: string, data: Partial<Book>): Book | undefined => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return undefined;
  books[index] = { ...books[index], ...data };
  return books[index];
};

export const deleteBook = (id: string): boolean => {
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  return books.length < initialLength;
};

export const importBooksBulk = (entries: Omit<Book, 'id'>[]) => {
  const added: Book[] = [];
  const errors: { row: number; error: string }[] = [];
  entries.forEach((entry, index) => {
    const { title, author, publishedYear } = entry;
    if (!title || !author || typeof publishedYear !== 'number') {
      errors.push({ row: index + 1, error: 'Invalid fields' });
    } else {
      added.push(addBook(entry));
    }
  });
  return { addedCount: added.length, errors };
};
import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { parseCSV } from '../utils/parseCSV';

export const getAllBooks = (req: Request, res: Response): void => {
  res.json(bookService.getAllBooks());
};

export const getBook = (req: Request, res: Response): void => {
  const book = bookService.getBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.json(book);
};

export const createBook = (req: Request, res: Response): void => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || typeof publishedYear !== 'number') {
    res.status(400).json({ error: 'Invalid book data' });
    return;
  }
  const book = bookService.addBook({ title, author, publishedYear });
  res.status(201).json(book);
};

export const updateBook = (req: Request, res: Response): void => {
  const book = bookService.updateBook(req.params.id, req.body);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.json(book);
};

export const deleteBook = (req: Request, res: Response): void => {
  const deleted = bookService.deleteBook(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.status(204).send();
};

export const importBooks = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  const entries = await parseCSV(req.file.path);
  const result = bookService.importBooksBulk(entries);
  res.json(result);
};

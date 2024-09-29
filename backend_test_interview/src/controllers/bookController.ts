import { Request, Response } from 'express';
import Book from '../models/Book';
import mongoose, { Types } from 'mongoose';

export const checkBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const books = await Book.find();
    const availableBooks = books.map(book => ({
      id : book._id,
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.borrowedBy ? 0 : book.stock,
    }));
    res.status(200).json(availableBooks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
};

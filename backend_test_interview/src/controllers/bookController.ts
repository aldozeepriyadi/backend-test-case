import { Request, Response } from 'express';
import Book from '../models/Book';

export const checkBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ borrowedBy: null });
    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

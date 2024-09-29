import { Request, Response, NextFunction } from 'express';
import Member from '../models/Member';
import Book from '../models/Book';

export const checkMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const members = await Member.find().populate('borrowedBooks', 'title');
    res.status(200).json(members);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { memberId, bookId } = req.body;
    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);

    if (!member || !book) {
      res.status(404).json({ message: 'Member or book not found' });
      return;
    } 
    
    if (member.penalty.status) {
      res.status(400).json({ message: 'Member is under penalty' });
      return;
    }

    if (member.borrowedBooks.length >= 2) {
      res.status(400).json({ message: 'Cannot borrow more than 2 books' });
      return;
    }

    if (book.borrowedBy) {
      res.status(400).json({ message: 'Book is already borrowed' });
      return;
    }

    member.borrowedBooks.push(bookId);
    book.borrowedBy = memberId;

    await member.save();
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

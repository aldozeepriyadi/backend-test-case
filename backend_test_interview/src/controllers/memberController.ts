import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Member from '../models/Member';
import Book from '../models/Book';

export const checkMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await Member.find().populate('borrowedBooks', 'title');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching members' });
  }
};

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId, bookId } = req.body;
    
    // Mengkonversi memberId dan bookId menjadi ObjectId
    const memberObjectId = new mongoose.Types.ObjectId(memberId);
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    const member = await Member.findById(memberObjectId);
    const book = await Book.findById(bookObjectId);

    if (!member || !book) {
      res.status(404).json({ message: 'Member or book not found' });
      return;
    }

    // Check if member is under penalty
    if (member.penalty.status) {
      res.status(400).json({ message: `Member is under penalty until ${member.penalty.endDate}` });
      return;
    }

    // Check if member has already borrowed 2 books
    if (member.borrowedBooks.length >= 2) {
      res.status(400).json({ message: 'Cannot borrow more than 2 books' });
      return;
    }

    // Check if the book is already borrowed
    if (book.borrowedBy) {
      res.status(400).json({ message: 'Book is already borrowed by another member' });
      return;
    }

    member.borrowedBooks.push(book._id as Types.ObjectId);  // Menggunakan type assertion
    book.borrowedBy = member._id as Types.ObjectId;          // Menggunakan type assertion
    book.borrowedAt = new Date();

    await member.save();
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while borrowing the book' });
  }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId, bookId } = req.body;

    // Mengkonversi memberId dan bookId menjadi ObjectId
    const memberObjectId = new mongoose.Types.ObjectId(memberId);
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    const member = await Member.findById(memberObjectId);
    const book = await Book.findById(bookObjectId);

    if (!member || !book) {
      res.status(404).json({ message: 'Member or book not found' });
      return;
    }

    // Check if the book was actually borrowed by this member
    if (!member.borrowedBooks.includes(book._id as Types.ObjectId)) {
      res.status(400).json({ message: 'This book was not borrowed by the member' });
      return;
    }

    // Calculate if the member should be penalized
    const borrowedDays = Math.floor((new Date().getTime() - (book.borrowedAt?.getTime() || 0)) / (1000 * 60 * 60 * 24));
    if (borrowedDays > 7) {
      member.penalty = {
        status: true,
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Penalized for 3 days
      };
    }

    member.borrowedBooks = member.borrowedBooks.filter((id) => id.toString() !== book._id?.toString());
    book.borrowedBy = null;
    book.borrowedAt = null;

    await member.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while returning the book' });
  }
};

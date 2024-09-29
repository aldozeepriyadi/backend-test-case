import express from 'express';
import { checkBooks } from '../controllers/bookController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books that are not borrowed
 *     tags: [Books]  # Mengelompokkan endpoint ini ke dalam kategori "Books"
 *     responses:
 *       200:
 *         description: A list of books that are available
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the book
 *                   code:
 *                     type: string
 *                     description: The code of the book
 *                   title:
 *                     type: string
 *                     description: The title of the book
 *                   author:
 *                     type: string
 *                     description: The author of the book
 *                   stock:
 *                     type: number
 *                     description: The number of available copies
 *                   borrowedBy:
 *                     type: string
 *                     nullable: true
 *                     description: The ID of the member who borrowed the book (if any)
 *                   borrowedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     description: The date when the book was borrowed
 */
router.get('/books', checkBooks);

export default router;

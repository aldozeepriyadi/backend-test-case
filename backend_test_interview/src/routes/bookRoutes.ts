import express from 'express';
import { checkBooks } from '../controllers/bookController';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books that are not borrowed
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
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: number
 */
router.get('/books', checkBooks);

export default router;

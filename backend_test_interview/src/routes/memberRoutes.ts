import express from 'express';
import { checkMembers, borrowBook } from '../controllers/memberController';

const router = express.Router();

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     responses:
 *       200:
 *         description: A list of all members
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
 *                   name:
 *                     type: string
 *                   borrowedBooks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 */
router.get('/members', checkMembers);

/**
 * @swagger
 * /api/members/borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 */
router.post('/members/borrow', borrowBook);

export default router;

import express from 'express';
import { checkMembers, borrowBook, returnBook } from '../controllers/memberController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retrieve a list of members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/members', checkMembers);

/**
 * @swagger
 * /api/members/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
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
 *       404:
 *         description: Member or book not found
 */
router.post('/members/borrow', borrowBook);

/**
 * @swagger
 * /api/members/return:
 *   post:
 *     summary: Return a book
 *     tags: [Members]
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
 *         description: Book returned successfully
 *       404:
 *         description: Member or book not found
 */
router.post('/members/return', returnBook);

export default router;

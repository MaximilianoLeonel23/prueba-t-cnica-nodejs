import { Router } from 'express';
import { createCategory } from '../controllers/category/createCategory.js';
import { validateSchema } from '../middlewares/validation/validateSchema.js';
import { CategorySchema } from '../schemas/category/categorySchema.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           description: Name of the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: Electronics
 *         createdAt: 2024-12-02T10:30:00.000Z
 *         updatedAt: 2024-12-02T10:30:00.000Z
 *
 *   responses:
 *     CategoryCreated:
 *       description: Successfully created a new category
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               result:
 *                 $ref: '#/components/schemas/Category'
 *     ValidationError:
 *       description: Invalid input data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Validation error message
 *
 * tags:
 *   - name: Categories
 *     description: API for managing categories
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/CategoryCreated'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post('/', validateSchema(CategorySchema), createCategory);

export default router;

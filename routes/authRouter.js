import e from 'express';
import { login } from '../controllers/auth/login.js';
import { register } from '../controllers/auth/register.js';
import { logout } from '../controllers/auth/logout.js';
import { validateSchema } from '../middlewares/validation/validateSchema.js';
import { userSchema } from '../schemas/auth/userSchema.js';

const router = e.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         username: testuser
 *         password: mypassword123
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Sign In
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Invalid Credential
 */
router.post('/login', validateSchema(userSchema), login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Sign Up
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation Error
 */
router.post('/register', validateSchema(userSchema), register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Session closed
 */
router.post('/logout', logout);

export default router;

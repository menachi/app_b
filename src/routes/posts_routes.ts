import express from "express";
const router = express.Router();
import postController from "../controllers/post_controller";
import { authMiddleware } from "../controllers/auth_controller";

/**
* @swagger
* tags:
*   name: Posts
*   description: The Posts API
*/

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         owner:
 *           type: string
 *       example:
 *         _id: "asdfasdfasdfasdfasdfasdf"
 *         title: "Sample Post"
 *         content: "This is a sample post content."
 *         owner: "asdfasdfasdfasdfas"
 */

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Retrieves all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", postController.getAll.bind(postController));

router.get("/:id", (req, res) => {
    postController.getById(req, res);
});

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Creates a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad Request
 */
router.post("/", authMiddleware, postController.create.bind(postController));
router.post("/", authMiddleware, postController.create.bind(postController));


export default router;

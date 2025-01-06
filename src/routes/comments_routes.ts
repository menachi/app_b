import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
import { authMiddleware } from "../controllers/auth_controller";

/**
* @swagger
* tags:
*   name: Comments
*   description: The Comments API
*/

router.get("/", commentsController.getAll.bind(commentsController));

router.get("/:id", (req, res) => {
    commentsController.getById(req, res);
});

router.post("/", authMiddleware, commentsController.create.bind(commentsController));


export default router;

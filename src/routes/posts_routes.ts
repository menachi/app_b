import express from "express";
const router = express.Router();
import Post from "../controllers/post_controller";

router.get("/", Post.getAllPosts);

router.get("/:id", (req, res) => {
    Post.getPostById(req, res);
});

router.post("/", Post.createPost);


export default router;

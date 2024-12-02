import postModel from "../models/posts_model";
import { Request, Response } from "express";

const getAllPosts = async (req: Request, res: Response) => {
  const ownerFilter = req.query.owner;
  try {
    if (ownerFilter) {
      const posts = await postModel.find({ owner: ownerFilter });
      res.status(200).send(posts);
    } else {
      const posts = await postModel.find();
      res.status(200).send(posts);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id);
    if (post === null) {
      return res.status(404).send("Post not found");
    } else {
      return res.status(200).send(post);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const createPost = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const post = await postModel.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

export default { getAllPosts, createPost, getPostById };

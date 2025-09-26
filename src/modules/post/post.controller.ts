import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPosts();

    res.status(201).json({
      success: true,
      message: "Post retrieved successfully!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const postController = { createPost, getPosts };

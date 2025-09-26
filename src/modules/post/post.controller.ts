import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = await postService.createPost(req.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const postController = { createPost };

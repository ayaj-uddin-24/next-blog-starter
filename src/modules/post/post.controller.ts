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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured == "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const post = await postService.getPosts({
      page,
      limit,
      search,
      isFeatured,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Post retrieved successfully!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostByID = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostByID(Number(req.params.id));

    res.status(201).json({
      success: true,
      message: "Post retrieved successfully!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await postService.updatePost(Number(req.params.id), req.body);

    res.status(201).json({
      success: true,
      message: "Post updated successfully!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await postService.deletePost(Number(req.params.id));

    res.status(201).json({
      success: true,
      message: "Post deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogStat = async (req: Request, res: Response) => {
  try {
    const post = await postService.getBlogStat();

    res.status(201).json({
      success: true,
      message: "Post Stat Gotten Successfully!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const postController = {
  createPost,
  getPosts,
  getPostByID,
  updatePost,
  deletePost,
  getBlogStat,
};

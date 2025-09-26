import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostByID);
router.put("/:id", postController.updatePost);
router.post("/create", postController.createPost);
router.delete("/:id", postController.deletePost)

export const postRouter = router;

import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostByID);
router.post("/create", postController.createPost);

export const postRouter = router;

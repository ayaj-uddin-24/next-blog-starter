import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserByID);
router.post("/create", userController.createUser);

export const userRouter = router;

import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserByID);
router.post("/create", userController.createUser);
router.put("/:id", userController.updateUser);

export const userRouter = router;

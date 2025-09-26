import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUsers();

    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserByID = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByID(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userController = {
  createUser,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
};

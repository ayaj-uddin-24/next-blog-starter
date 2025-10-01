import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);
    res.status(200).json({ success: true, message: "Login Successful", user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const googleLogin = async (req: Request, res: Response) => {
  try {
    const user = await authService.googleLogin(req.body);
    res.status(200).json({ success: true, message: "Login Successful", user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const authController = { login, googleLogin };

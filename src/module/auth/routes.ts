import { Router } from "express";
import * as AuthController from "./controller";



export const authRoutes = Router();
authRoutes.post(
  "/auth/register",

  AuthController.registerUser
);
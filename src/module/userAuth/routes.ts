import { Router } from "express";
import * as AuthController from "./controller";



export const userAuth = Router();
userAuth.post(
  "/auth/register",

  AuthController.registerUser
);
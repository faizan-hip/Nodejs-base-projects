import { Router } from "express";
import * as AuthController from "./controller";
import validator, { ValidationSource } from "../../utils/validators";
import rules from "./rules";



export const authRoutes = Router();
authRoutes.post(
  "/auth/registerAdmin",
  validator(rules.register, ValidationSource.BODY),
  AuthController.registerAdmin
);

authRoutes.post(
  "/auth/loginAdmin",
  validator(rules.login, ValidationSource.BODY),
  AuthController.loginAdmin 
);

authRoutes.post(
  "/auth/verfiOtp",
 
  AuthController.verfiRegisterUserOtp
);


authRoutes.put(
  "/auth/Admin/:id",
 
  AuthController.updateAdmin
);
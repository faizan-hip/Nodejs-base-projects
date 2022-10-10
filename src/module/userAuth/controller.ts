import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
//   usersLogger,
//   hashPassword,
//   createToken,
//   RefreshToken,
  notFoundHandler,
} from "../../utils/responseHandler";
import User, { UserModel } from "./model";

export const registerUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user",req.body);
    const findUser = await UserModel.findOne({email:req.body.email,phone:req.body.phone})
    console.log("findUser",findUser)
    try {
   if(!findUser)
   {

   }
      }
     catch (err) {
     
      serverErrorHandler(res, err);
    }
  };
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


export const registerUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user");
    try {
   
      }
     catch (err) {
     
      serverErrorHandler(res, err);
    }
  };
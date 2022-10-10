import * as express from "express";


import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
 notFoundHandler,
} from "../../utils/responseHandler";

import {  hashPassword} from "../../utils/hashPassword"
import Admin, { AdminModel } from "./model";

export const registerAdmin = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user",req.body);
    const findAdmin =await AdminModel.findOne({email:req.body.email,fullName:req.body.fullName})

    try {
   console.log("before",findAdmin)
   if(!findAdmin)
   {
    console.log("After",findAdmin)
    let createAdmin =new AdminModel(req.body)

  //   {
  //     "email":"farhan.alii",
  //     "fullName":"farhan",
  //     "phone":12312312,
  //     "password":"dsadasdsa"
  // }

  // admin.password = hashPassword(req.body.password, "10");

    createAdmin.email = req.body.email,
    createAdmin.fullName = req.body.fullName,
    createAdmin.phone = req.body.phone,
    createAdmin.password = hashPassword(req.body.password, "10");

    await createAdmin.save()
    // res.cookie("token", token, {
    //   secure: false,
    //   httpOnly: true,
    // });
    return successHandler(res, { admin: createAdmin }, "Admin Registered Successfully.");
   }
   if(findAdmin){
   return  badRequestHandler(res, "Admin Already Exist.");
   }
      }
     catch (err) {
     
     return serverErrorHandler(res, err);
    }
  };


  export const loginAdmin = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user",req.body);
    try {
   
      }
     catch (err) {
     
      serverErrorHandler(res, err);
    }
  };


  // export const editProfile= async (
  //   req: express.Request,
  //   res: express.Response
  // ): Promise<void> => {

  //   console.log("user");
  //   try {
   
  //     }
  //    catch (err) {
     
  //     serverErrorHandler(res, err);
  //   }
  // };

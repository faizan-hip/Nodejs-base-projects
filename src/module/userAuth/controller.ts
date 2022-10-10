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
import {  hashPassword} from "../../utils/hashPassword"
import {requestMobile } from '../../utils/sendOtp'
import {createToken} from '../../utils/createToken'
import User, { UserModel } from "./model";

export const registerUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user",req.body);
    const findUser = await UserModel.findOne({email:req.body.email,phone:req.body.phone}) as User
    // console.log("findUser",findUser)
    try {
      if(!findUser)
      {
       console.log("After",findUser)
       let createUser =new UserModel()
   
   
   
     const otpGenerate =Math.floor(1000 + Math.random() * 9000).toString();
    
       createUser.firstName = req.body.firstName,
       createUser.lastName = req.body.lastName,
       createUser.email =req.body.email,
       createUser.phone = req.body.phone,
       createUser.password = hashPassword(req.body.password, "10");
       createUser.otpCode =otpGenerate
       createUser.otpCodeExpires=new Date().getTime() + 300 *1000
       const resultt= await requestMobile("+33600000000",otpGenerate) as any
       await createUser.save()
       const token = createToken(req.body.email.toString());
       res.cookie("token", token, {
         secure: false,
         httpOnly: true,
       });
       console.log("resultt",resultt.body)
       return successHandler(res, { admin: createUser }, "Admin Registered Successfully.");
      }

      if(findUser && findUser.isVerified == true){
        return  badRequestHandler(res, "Admin Already Exist.");
        }
        if(findUser && findUser.isVerified == false)
        {
         const otpGenerate =Math.floor(1000 + Math.random() * 9000).toString();
         const updateForgetConfirmation= await  UserModel.findOneAndUpdate(
             
           {email:req.body.email}
         ,
         {
                $set: {
                
              
                 password:hashPassword(req.body.password, "10"),
                 firstName : req.body.firstName,
                //  lastName:req.body.lastName,
                 otpCode:otpGenerate,
                 otpCodeExpires:new Date().getTime() + 300 *1000
               
                } 
           }) as User
           const resultt= await requestMobile("+33600000000",otpGenerate) as any
           const token = createToken(req.body.email.toString());
           res.cookie("token", token, {
             secure: false,
             httpOnly: true,
           });
           return successHandler(res, { code: otpGenerate }, "code send to mobile");
        }
      }
     catch (err) {
     
      serverErrorHandler(res, err);
    }
  };
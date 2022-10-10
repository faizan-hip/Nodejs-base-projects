import * as express from "express";


import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
  
 notFoundHandler,
} from "../../utils/responseHandler";

import {  hashPassword} from "../../utils/hashPassword"
import {requestMobile } from '../../utils/sendOtp'
import {createToken} from '../../utils/createToken'
import Admin, { AdminModel } from "./model";

export const registerAdmin = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user",req.body);
    const findAdmin =await AdminModel.findOne({email:req.body.email})

    try {
   console.log("before",findAdmin)
   if(!findAdmin)
   {
    console.log("After",findAdmin)
    let createAdmin =new AdminModel(req.body)



  const otpGenerate =Math.floor(1000 + Math.random() * 9000).toString();
 
    createAdmin.email = req.body.email,
    createAdmin.fullName = req.body.fullName,
    createAdmin.phone = req.body.phone,
    createAdmin.password = hashPassword(req.body.password, "10");
    createAdmin.otpCode =otpGenerate
    createAdmin.otpCodeExpires=new Date().getTime() + 300 *1000
    const resultt= await requestMobile("+33600000000",otpGenerate) as any
    await createAdmin.save()
    const token = createToken(req.body.email.toString());
    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
    });
    console.log("resultt",resultt.body)
    return successHandler(res, { admin: createAdmin }, "Admin Registered Successfully.");
   }
   if(findAdmin && findAdmin.isVerified == true){
   return  badRequestHandler(res, "Admin Already Exist.");
   }
   if(findAdmin && findAdmin.isVerified == false)
   {
    const otpGenerate =Math.floor(1000 + Math.random() * 9000).toString();
    const updateForgetConfirmation= await  AdminModel.findOneAndUpdate(
        
      {email:req.body.email}
    ,
    {
           $set: {
           
         
            password:hashPassword(req.body.password, "10"),
            fullName : req.body.fullName,
            otpCode:otpGenerate,
            otpCodeExpires:new Date().getTime() + 300 *1000
          
           } 
      }) 
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
     
     return serverErrorHandler(res, err);
    }
  };


  export const loginAdmin = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {

    console.log("user",req.body);
    const findAdmin =await AdminModel.findOne({email:req.body.email}).select(['password', 'isVerified'])
    console.log("findAdmin",findAdmin)
    try {
   if(!findAdmin)
   {
    return  badRequestHandler(res, "email does not found");
   }
   if(findAdmin){
   let  password= hashPassword(req.body.password, "10")
   if(password != findAdmin.password)
   {
    return  badRequestHandler(res, "password doesn't match");
   }
   else{
    if(findAdmin.isVerified == true)
    {
      const token = createToken(req.body.email.toString());
      res.cookie("token", token, {
        secure: false,
        httpOnly: true,
      });
      return successHandler(res, { admin: findAdmin }, "Admin Login Successfully.");
     
    }
    else{
      return  badRequestHandler(res, "isVerified falser");
    }
    // if(findAdmin.isVerified == false)
    // {
    //   const token = createToken(req.body.email.toString());
    //   res.cookie("token", token, {
    //     secure: false,
    //     httpOnly: true,
    //   });
    //   return  badRequestHandler(res, "please verified user with otp");
     
    // }
   }
  //  if(password == findAdmin.password)
  //  {
   
  //  }

  //  if(password == findAdmin.password)
  //  {
   
  //  }
  //  successHandler(res, { admin: findAdmin }, "Admin Login Successfully.");
   }

  //  if(findAdmin)
  //  {
  
  //  }
  
      }
     catch (err) {
     
      serverErrorHandler(res, err);
    }
  };



  export const verfiRegisterUserOtp=async (  
    req: express.Request,
    res: express.Response)=>{
      console.log("req.params.confirmPassword",req.body)
      console.log("req.body",req.body)
      const findUser = await AdminModel.findOne({
      otpCode:req.body.otpCode}) as Admin
      console.log("findUser",findUser)

      // if(findUser)
      // {
      //   return badRequestHandler(res, "confirmation code error");
      // }
    
      try{
        const currentTime = new Date().getTime()
        if(!findUser)
    {
     return badRequestHandler(res, "confirmation code error");
    }
    if(findUser)
    {

    const data = findUser.otpCodeExpires - currentTime
    console.log("data",data)
    if(data < 0)
    {
      return badRequestHandler(res, "Otp is expired");
    }
    
    
   
    
      const optCodeUpdate= await  AdminModel.findOneAndUpdate(
        
          {otpCode:req.body.otpCode}
        ,
        {
               $set: {
              
              
                otpCode:false,
                isVerified:true,
               } 
          }) as any



         
      return successHandler(res, { user:  optCodeUpdate}, "user verified true");
    
    
    }
      
      }
      catch(err)
      {
        return serverErrorHandler(res, err);
      }
  
  }


  export const updateAdmin = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    console.log("user",req.body);
    const findAdmin =await AdminModel.findOne({email:req.body.email})
   


    try {
      console.log("user",req.body);
      const findAdmin =await AdminModel.findById(req.params.id)
      console.log("findAdmin",findAdmin)
  
      }
     catch (err) {
     
     return serverErrorHandler(res, err);
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

import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
  firstName: string;
  lastName:string;
  phone: string;
  email: string;
  password: string;
  otpCode:string;
  isVerified:boolean;
  otpCodeExpires:any;
}

const schema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    phone:{
      type: Schema.Types.String,
      trim: true,
      select: false,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      trim: true,
      select: false,
      required: true,
    },
    // forgetConfirmationCode:{
    //   type: String, 
    //   unique: true,
 
    // },
    otpCode:{
      type: Schema.Types.String,
      trim: true,
      select: false,
      required: true,
    },
    
    otpCodeExpires:{
      type: Date, 
      default:new Date
    },
    isVerified:{
      type: Schema.Types.Boolean,
      default:false
    },
  },
  
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

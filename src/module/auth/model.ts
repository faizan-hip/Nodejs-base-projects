import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
  fullName: string;
  phone: string;
  email: string;
  isPromoValid: boolean;
  password: string;
  forgetConfirmationCode:string;
  forgetConfirmationCodeExpires:any;
  resetPasswordToken:string;
  resetCodeExpires:any;
  resetPasswordExpires:any;
  otpCode:string;
  otpCodeExpires:any;
  isVerified:boolean;
}

const schema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
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
    isPromoValid: {
      type: Schema.Types.Boolean,
      default: false,
    },
    password: {
      type: Schema.Types.String,
      trim: true,
      select: false,
      required: true,
    },
    forgetConfirmationCode:{
      type: String, 
      unique: true,
      default:false
 
    },
    forgetConfirmationCodeExpires:{
      type: Date, 
      default:new Date
      
 
    },
    resetPasswordToken: {
      type:  String, 
      unique: true,
      default:false
      
 
  },

    resetCodeExpires:{
    type: Date, 
    default:new Date
    

  },

  resetPasswordExpires: {
      type: Date,
      required: false
  },
   otpCode:{
    type: String, 
      unique: true,
      default:false
  },
  otpCodeExpires:{
    type: Date, 
    default:new Date
  },
  isVerified:{
    type: Schema.Types.Boolean,
    default:false
  }
    // forgetConfirmationCode: [{ body: String, date: Date }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
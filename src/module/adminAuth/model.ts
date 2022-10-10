import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Admin";
export const COLLECTION_NAME = "admins";

export default interface Admin extends Document {
  fullName: string;
  phone: string;
  email: string;
  password: string;
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
 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const AdminModel = model<Admin>(DOCUMENT_NAME, schema, COLLECTION_NAME);

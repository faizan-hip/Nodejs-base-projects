import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Token";
export const COLLECTION_NAME = "tokens";
export default interface Token extends Document {
    userId: string;
    token: string;
    refreshToken: string;
  }


  const schema = new Schema(
    {
        userId: {
        type: Schema.Types.String,
        required: true,
       
      },
      // token: {
      //   type: Schema.Types.String,
      //   required: true,
        
      // },
      refreshToken: {
        type: Schema.Types.String,
        required: true,
      
      },
      
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  export const TokenModel = model<Token>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME
  );
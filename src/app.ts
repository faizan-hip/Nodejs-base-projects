import express, { Application } from "express";
import bodyParser from "body-parser";




const app: Application = express();



app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
  );


  export default app;
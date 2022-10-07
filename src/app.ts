import express, { Application } from "express";
import bodyParser from "body-parser";
import { authRoutes } from "./module/auth";




const app: Application = express();



app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
  );

  app.use("/api/v1", [
    authRoutes,
    // adminRoutes,
    // categoryRoutes,
    // dishRoutes,
    // orderRoutes,
    // promoRoutes,
    // userRoutes,
  ]);

  export default app;
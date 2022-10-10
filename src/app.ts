import express, { Application } from "express";
import bodyParser from "body-parser";
import { authRoutes } from "./module/adminAuth";
import cookieParser from "cookie-parser";
import { userAuth } from "./module/userAuth/routes";



const app: Application = express();

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
  );

  app.use("/api/v1", [
    authRoutes,
    userAuth
    // categoryRoutes,
    // dishRoutes,
    // orderRoutes,
    // promoRoutes,
    // userRoutes,
  ]);

  export default app;
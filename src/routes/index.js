import express from "express";
import authRouter from "./atuh.routes.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;

import express from "express";
import authRouter from "./atuh.routes.js";
import materialRoutes from "./material.routes.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/materials", materialRoutes);

export default indexRouter;

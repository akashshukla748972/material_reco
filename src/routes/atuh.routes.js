import express from "express";
import { handleCreateUser } from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../models/user/registerSchema.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateMiddleware(registerSchema),
  handleCreateUser
);

export default authRouter;

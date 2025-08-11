import express from "express";
import {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
} from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../models/user/registerSchema.js";
import { loginSchema } from "../models/user/loginSchema.js";
import verifyUser from "../middlewares/verifyUser.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateMiddleware(registerSchema),
  handleCreateUser
);
authRouter.post("/login", validateMiddleware(loginSchema), handleLoginUser);
authRouter.get("/logout", verifyUser, handleLogoutUser);

export default authRouter;

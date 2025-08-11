import express from "express";
import { handleCreateUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/register", handleCreateUser);

export default authRouter;

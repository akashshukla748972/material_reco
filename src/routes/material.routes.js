import express from "express";
import {
  handleCreateMaterial,
  handleGetAllMaterial,
} from "../controllers/material.controller.js";
import verifyUser from "../middlewares/verifyUser.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { materialSchema } from "../models/material/materialSchema.js";

const materialRoutes = express.Router();

materialRoutes.post(
  "/create",
  verifyUser,
  validateMiddleware(materialSchema),
  handleCreateMaterial
);
materialRoutes.get("/get-all", verifyUser, handleGetAllMaterial);

export default materialRoutes;

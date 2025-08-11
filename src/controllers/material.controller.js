import materialModel from "../models/material/material.model.js";
import CustomError from "../utils/CustomError.js";
import mongoose from "mongoose";

export const handleCreateMaterial = async (req, res, next) => {
  try {
    const { materialName, materialCode } = req.body;

    const createfields = {
      materialName,
      materialCode,
    };

    const material = new materialModel(createfields);
    await material.save();

    res.status(201).json({
      isSuccess: true,
      data: material,
    });
  } catch (error) {
    console.error(`Error while creating new material: ${error.message}`);
    return next(new CustomError("internal server error.", 500));
  }
};

export const handleGetAllMaterial = async (req, res, next) => {
  try {
    const material = await materialModel.find().sort({ createdAt: -1 });

    if (material.length == 0) {
      return next(new CustomError("No material found.", 404));
    }

    res.status(201).json({
      isSuccess: true,
      data: material,
    });
  } catch (error) {
    console.error(`Error while getting all material: ${error.message}`);
    return next(new CustomError("internal server error.", 500));
  }
};

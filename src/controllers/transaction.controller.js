import CustomError from "../utils/CustomError";
import mongoose from "mongoose";

export const handleCreateTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error(`Error while creating new transaction: ${error.message}`);
    return next(new CustomError("internal server error.", 500));
  } finally {
    await session.endSession();
  }
};

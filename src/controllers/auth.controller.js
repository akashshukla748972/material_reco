import CustomError from "../utils/CustomError.js";

export const handleCreateUser = async (req, res, next) => {
  try {
    return res.status(201).json({
      message: "user created successfully.",
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while creating new user: ${error.message}`);
    return next(CustomError("Internal server error.", 500));
  }
};

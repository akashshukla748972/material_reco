import { gv } from "../../configs/globalVariable.js";
import userModel from "../models/user/user.model.js";
import { genToken } from "../services/token.js";
import CustomError from "../utils/CustomError.js";

export const handleCreateUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new CustomError("Email already exist.", 409));
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    const payload = { _id: newUser?._id };
    const token = genToken(payload, "1");
    if (!token?.isSuccess) {
      return next(new CustomError("Internal server error.", 500));
    }

    res.cookie("token", token?.token, {
      httpOnly: true,
      secure: gv.jwt_secret === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "user created successfully.",
      isSuccess: true,
      token: token?.token,
      data: req.body,
    });
  } catch (error) {
    console.error(`Error while creating new user: ${error.message}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

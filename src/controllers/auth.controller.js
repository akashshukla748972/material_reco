import { gv } from "../../configs/globalVariable.js";
import userModel from "../models/user/user.model.js";
import { genHash } from "../services/hash.js";
import { genToken } from "../services/token.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from "bcryptjs";

export const handleCreateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new CustomError("Email already exist.", 409));
    }

    const hashedPassword = await genHash(password);
    if (!hashedPassword?.isSuccess) {
      return next(new CustomError("Internal server error.", 500));
    }

    req.body = { ...req.body, password: hashedPassword?.hashedPassword };

    const newUser = new userModel(req.body);
    await newUser.save();

    const payload = { _id: newUser?._id };
    const token = genToken(payload, "1d");
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
    });
  } catch (error) {
    console.error(`Error while creating new user: ${error.message}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

export const handleLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (!isEmailExist) {
      return next(new CustomError("Invalid user name or password.", 400));
    }

    const isMatch = await bcrypt.compare(password, isEmailExist.password);
    if (!isMatch) {
      return next(new CustomError("Invalid user name or password.", 400));
    }

    const payload = { _id: isEmailExist?._id };
    const token = genToken(payload, "1d");
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
    });
  } catch (error) {
    console.error(`Error while logged in user: ${error.message}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

export const handleLogoutUser = async (req, res, next) => {
  try {
    const { userId } = req?.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: gv.jwt_secret === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "user logged out successfully.",
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error while logged out user: ${error.message}`);
    return next(new CustomError("Internal server error.", 500));
  }
};

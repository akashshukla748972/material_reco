import jwt from "jsonwebtoken";
import { gv } from "../../configs/globalVariable.js";
import CustomError from "../utils/CustomError.js";

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const userToken = req.cookies;

  if ((!authHeader || !authHeader.startsWith("Bearer")) && !userToken?.token) {
    return next(new CustomError("Unauthorized: No token provided", 401));
  }

  let token = null;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else {
    token = userToken?.token;
  }

  try {
    const decode = jwt.verify(token, gv.jwt_secret);
    req.user = {
      userId: decode?._id,
    };
    next();
  } catch (error) {
    console.error(`Error decoding token: ${error}`);
    return next(new CustomError("Invalid or expired token", 401));
  }
};

export default verifyUser;

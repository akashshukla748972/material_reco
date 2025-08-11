import jwt from "jsonwebtoken";
import { gv } from "../../configs/globalVariable.js";

export const genToken = (payload, exp = "1d") => {
  if (!payload) {
    return {
      isSuccess: false,
      message: "Payload is required.",
      statusCode: 400,
    };
  }
  const token = jwt.sign(payload, gv.jwt_secret, { expiresIn: exp });
  return {
    isSuccess: true,
    token,
  };
};

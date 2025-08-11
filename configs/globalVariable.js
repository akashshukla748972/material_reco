import dotenv from "dotenv";
dotenv.config();

export const gv = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
};

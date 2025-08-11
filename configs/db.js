import mongoose from "mongoose";
import { gv } from "./globalVariable.js";

export const connectToDb = async () => {
  try {
    mongoose.connect(`${gv.mongo_uri}`);
    console.log("database connected.");
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`);
    process.exit(1);
  }
};

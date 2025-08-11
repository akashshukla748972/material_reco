import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "others"],
      default: "Male",
    },
    phone: {
      type: String,
      default: "",
    },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);
export default userModel;

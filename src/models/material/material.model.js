import { Schema, model } from "mongoose";

const materialSchema = new Schema(
  {
    materialName: { type: String, required: true },
    materialCode: { type: String, required: true, unique: true },
    category: { type: String, default: "" },

    unit: { type: String, enum: ["nos", "km"], default: "nos" },
    openingStock: { type: Number, default: 0 },
    currentStock: { type: Number, default: 0 },

    unitPrice: { type: Number, default: 0 },
    totalValue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const materialModel = model("material", materialSchema);
export default materialModel;

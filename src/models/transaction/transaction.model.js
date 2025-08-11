import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "material",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["inward", "outward", "consumption", "material_return"],
      required: true,
    },

    quantity: { type: Number, required: true },
    unitPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },

    transactionDate: { type: Date, default: Date.now },

    vendorId: { type: String },
    partyName: { type: String },
    city: { type: String },
    circle: { type: String },
  },
  { timestamps: true }
);

const transactionModel = model("transaction", transactionSchema);
export default transactionModel;

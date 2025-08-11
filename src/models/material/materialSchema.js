import Joi from "joi";

export const materialSchema = Joi.object({
  materialName: Joi.string().trim().min(3).required(),
  materialCode: Joi.string().trim().min(3).required(),
  category: Joi.string().trim().min(3).optional(),
  unit: Joi.string().trim().min(1).optional(),
  stock: Joi.number().default(0),
  unitPrice: Joi.number().default(0),
});

import { body } from "express-validator";

export const createQuotationValidator = [
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid number"),

  body("estimatedDeliveryTime")
    .trim()
    .notEmpty()
    .withMessage("Estimated delivery time is required"),

  body("message")
    .optional()
    .trim(),
];
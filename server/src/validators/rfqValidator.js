import { body } from "express-validator";

export const createRFQValidator = [
  body("productName")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Product name must be between 2 and 150 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive number"),

  body("deliveryLocation")
    .trim()
    .notEmpty()
    .withMessage("Delivery location is required"),

  body("deadline")
    .notEmpty()
    .withMessage("Deadline is required")
    .isISO8601()
    .withMessage("Deadline must be a valid date"),
];
import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
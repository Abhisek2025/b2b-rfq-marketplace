import { body } from "express-validator";
export const registerValidator = [
    body("name")
    .notEmpty()
    .trim()
    .isLength({min:2})
    .withMessage("Name must be atleast 2 character long"),
    body("email") 
    .notEmpty()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please Provide the Valid email address"),
    body("password")
    .notEmpty()
    .isLength({min:8})
    .withMessage("Password must be atleast 8 character long"),

    body("role")
    .notEmpty()
    .isIn(["BUYER", "SUPPLIER"])
    .withMessage("Role must be BUYER or SUPPLIER"),
];
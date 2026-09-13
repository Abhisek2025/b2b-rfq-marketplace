import { Router } from "express";
import { registerUser,loginUser } from "../controllers/authController.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";
import { registerValidator } from "../validators/registerValidator.js";
import { loginValidator } from "../validators/loginValidator.js";


const router = Router();

router.post("/register",
registerValidator,
handleValidationErrors,
registerUser);
router.post("/login", 
loginValidator,
handleValidationErrors,
loginUser);

export default router;


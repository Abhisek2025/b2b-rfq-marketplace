import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import { handleValidationErrors } from "../middleware/validateMiddleware.js";
import { registerValidator } from "../validators/registerValidator.js";


const router = Router();

router.post("/register",
registerValidator,
handleValidationErrors,
registerUser);

export default router;


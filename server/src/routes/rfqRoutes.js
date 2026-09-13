import { Router } from "express";

import {
  createRFQ,
  getAllRFQs,
  getMyRFQs,
  getRFQById,
  updateRFQ,
  deleteRFQ,
} from "../controllers/rfqController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import { createRFQValidator } from "../validators/rfqValidator.js";

import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = Router();

router.get(
  "/",
  protect,
  getAllRFQs
);

router.post(
  "/",
  protect,
  authorizeRoles("BUYER"),
  createRFQValidator,
  handleValidationErrors,
  createRFQ
);

router.get(
  "/my",
  protect,
  authorizeRoles("BUYER"),
  getMyRFQs
);

router.get(
  "/:id",
  protect,
  getRFQById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("BUYER"),
  updateRFQ
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("BUYER"),
  deleteRFQ
);

export default router;
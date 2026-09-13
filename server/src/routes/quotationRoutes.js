import { Router } from "express";

import {
  createQuotation,
  getMyQuotations,
  getRFQQuotations,
} from "../controllers/quotationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import { createQuotationValidator } from "../validators/quotationValidator.js";

import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = Router();

router.post(
  "/rfq/:rfqId",
  protect,
  authorizeRoles("SUPPLIER"),
  createQuotationValidator,
  handleValidationErrors,
  createQuotation
);

router.get(
  "/my",
  protect,
  authorizeRoles("SUPPLIER"),
  getMyQuotations
);

router.get(
  "/rfq/:rfqId",
  protect,
  authorizeRoles("BUYER"),
  getRFQQuotations
);

export default router;
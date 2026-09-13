import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/protected", protect, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

router.get(
  "/buyer",
  protect,
  authorizeRoles("BUYER"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Buyer route accessed successfully",
      user: req.user,
    });
  }
);

router.get(
  "/supplier",
  protect,
  authorizeRoles("SUPPLIER"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Supplier route accessed successfully",
      user: req.user,
    });
  }
);

export default router;
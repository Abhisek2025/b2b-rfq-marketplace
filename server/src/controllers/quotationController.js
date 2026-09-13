import Quotation from "../models/Quotation.js";
import RFQ from "../models/RFQ.js";

export const createQuotation = async (req, res) => {
  try {
    const { price, estimatedDeliveryTime, message } = req.body;
    const { rfqId } = req.params;

    const rfq = await RFQ.findByPk(rfqId);

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }

    if (rfq.status !== "OPEN") {
      return res.status(400).json({
        success: false,
        message: "This RFQ is closed",
      });
    }

    if (rfq.buyerId === req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Buyer cannot submit quotation to own RFQ",
      });
    }

    const existingQuotation = await Quotation.findOne({
      where: {
        rfqId,
        supplierId: req.user.id,
      },
    });

    if (existingQuotation) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a quotation",
      });
    }

    const quotation = await Quotation.create({
      rfqId,
      supplierId: req.user.id,
      price,
      estimatedDeliveryTime,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Quotation submitted successfully",
      quotation,
    });
  } catch (error) {
    console.error("Create quotation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.findAll({
      where: {
        supplierId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: quotations.length,
      quotations,
    });
  } catch (error) {
    console.error("Get quotations error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getRFQQuotations = async (req, res) => {
  try {
    const rfq = await RFQ.findByPk(req.params.rfqId);

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }

    if (rfq.buyerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only view quotations for your own RFQs",
      });
    }

    const quotations = await Quotation.findAll({
      where: {
        rfqId: req.params.rfqId,
      },
      order: [["price", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      count: quotations.length,
      quotations,
    });
  } catch (error) {
    console.error("Get RFQ quotations error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
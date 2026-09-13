import RFQ from "../models/RFQ.js";

export const createRFQ = async (req, res) => {
  try {
    const {
      productName,
      description,
      quantity,
      deliveryLocation,
      deadline,
    } = req.body;

    const rfq = await RFQ.create({
      buyerId: req.user.id,
      productName,
      description,
      quantity,
      deliveryLocation,
      deadline,
    });

    return res.status(201).json({
      success: true,
      message: "RFQ created successfully",
      rfq,
    });
  } catch (error) {
    console.error("Create RFQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllRFQs = async (req, res) => {
  try {
    const rfqs = await RFQ.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: rfqs.length,
      rfqs,
    });
  } catch (error) {
    console.error("Get RFQs error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyRFQs = async (req, res) => {
  try {
    const rfqs = await RFQ.findAll({
      where: {
        buyerId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: rfqs.length,
      rfqs,
    });
  } catch (error) {
    console.error("Get my RFQs error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getRFQById = async (req, res) => {
  try {
    const rfq = await RFQ.findByPk(req.params.id);

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }

    return res.status(200).json({
      success: true,
      rfq,
    });
  } catch (error) {
    console.error("Get RFQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.findByPk(req.params.id);

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }

    if (rfq.buyerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own RFQs",
      });
    }

    await rfq.update({
      productName: req.body.productName ?? rfq.productName,
      description: req.body.description ?? rfq.description,
      quantity: req.body.quantity ?? rfq.quantity,
      deliveryLocation:
        req.body.deliveryLocation ?? rfq.deliveryLocation,
      deadline: req.body.deadline ?? rfq.deadline,
    });

    return res.status(200).json({
      success: true,
      message: "RFQ updated successfully",
      rfq,
    });
  } catch (error) {
    console.error("Update RFQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.findByPk(req.params.id);

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }

    if (rfq.buyerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own RFQs",
      });
    }

    await rfq.destroy();

    return res.status(200).json({
      success: true,
      message: "RFQ deleted successfully",
    });
  } catch (error) {
    console.error("Delete RFQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// controllers/GoldRateController/goldRateController.js

const GoldRate = require("../../models/AddGold/GoldRate");

// CREATE
exports.createGoldRate = async (req, res) => {
  try {
    const goldRate = await GoldRate.create(req.body);

    res.status(200).json({
      success: true,
      message: "Gold rate created successfully",
      goldRate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// GET ALL
exports.getGoldRates = async (req, res) => {
  try {
    const goldRates = await GoldRate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      goldRates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// GET SINGLE
exports.getGoldRateById = async (req, res) => {
  try {
    const goldRate = await GoldRate.findById(req.params.id);

    if (!goldRate) {
      return res.status(404).json({
        success: false,
        message: "Gold rate not found",
      });
    }

    res.status(200).json({
      success: true,
      goldRate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// UPDATE
exports.updateGoldRate = async (req, res) => {
  try {
    const updatedGoldRate = await GoldRate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Gold rate updated successfully",
      updatedGoldRate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// DELETE
exports.deleteGoldRate = async (req, res) => {
  try {
    await GoldRate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gold rate deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
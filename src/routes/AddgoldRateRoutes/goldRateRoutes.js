// routes/GoldRateRoutes/goldRateRoutes.js

const express = require("express");

const router = express.Router();

const GoldRateController = require("../../controllers/AddgoldRateController/goldRateController");

// CREATE
router.post(
  "/createGoldRate",
  GoldRateController.createGoldRate
);

// GET ALL
router.get(
  "/getGoldRates",
  GoldRateController.getGoldRates
);

// GET SINGLE
router.get(
  "/getGoldRate/:id",
  GoldRateController.getGoldRateById
);

// UPDATE
router.put(
  "/updateGoldRate/:id",
  GoldRateController.updateGoldRate
);

// DELETE
router.delete(
  "/deleteGoldRate/:id",
  GoldRateController.deleteGoldRate
);

module.exports = router;
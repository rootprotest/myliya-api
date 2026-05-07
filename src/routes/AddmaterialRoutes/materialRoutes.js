// routes/MaterialRoutes/materialRoutes.js

const express = require("express");

const router = express.Router();

const MaterialController = require("../../controllers/AddmaterialController/materialController");

// CREATE
router.post(
  "/createMaterial",
  MaterialController.createMaterial
);

// GET ALL
router.get(
  "/getMaterials",
  MaterialController.getMaterials
);

// GET SINGLE
router.get(
  "/getMaterial/:id",
  MaterialController.getMaterialById
);

// UPDATE
router.put(
  "/updateMaterial/:id",
  MaterialController.updateMaterial
);

// DELETE
router.delete(
  "/deleteMaterial/:id",
  MaterialController.deleteMaterial
);

module.exports = router;
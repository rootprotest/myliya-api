// models/Material/Material.js

const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    materialName: {
      type: String,
      required: true,
      enum: [
        "Gold",
        "Diamond",
        "Platinum",
        "Silver",
        "Gemstone",
      ],
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", MaterialSchema);
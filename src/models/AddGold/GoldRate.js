// models/GoldRate/GoldRate.js

const mongoose = require("mongoose");

const GoldRateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    gold22KT: {
      type: Number,
      required: true,
    },

    gold24KT: {
      type: Number,
      required: true,
    },

    gold18KT: {
      type: Number,
      default: 0,
    },

    silverRate: {
      type: Number,
      default: 0,
    },

    date: {
      type: String,
      required: true,
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

module.exports = mongoose.model("GoldRate", GoldRateSchema);
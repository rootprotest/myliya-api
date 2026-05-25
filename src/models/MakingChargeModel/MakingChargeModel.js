const mongoose = require('mongoose');

const MakingChargeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  chargeType: {
    type: String,
    enum: ['flat', 'per_gram', 'percentage'],
    required: true,
    default: 'flat',
  },
  chargeValue: {
    type: Number,
    required: true,
    min: 0,
  },
  stoneCharges: {
    type: Number,
    default: 0,
    min: 0,
  },
  gstPercent: {
    type: Number,
    default: 3,
    min: 0,
  },
  minCharge: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxCharge: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
MakingChargeSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

MakingChargeSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('MakingCharge', MakingChargeSchema);

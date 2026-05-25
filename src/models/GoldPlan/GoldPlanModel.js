const mongoose = require('mongoose');

const GoldPlanSchema = new mongoose.Schema({
  // Plan type
  planType: { type: String, enum: ['JSAP', 'PIP'], required: true },

  // Customer info
  customerFirstName: { type: String, required: true },
  customerLastName:  { type: String },
  email:             { type: String },
  phone:             { type: String },

  // JSAP-specific
  monthlyContribution: { type: Number },
  installmentsPaid:    { type: Number, default: 0 },
  maturityBenefit:     { type: Number },

  // PIP-specific
  investmentAmount: { type: Number },
  discountOnVA:     { type: Number },

  // Common
  duration:    { type: Number, required: true },
  startDate:   { type: Date, required: true },
  maturityDate:{ type: Date },
  totalPaid:   { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['Active', 'Matured', 'Redeemed', 'Cancelled'],
    default: 'Active',
  },

  redemptionDate:   { type: Date },
  redemptionAmount: { type: Number },

  notes:     { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GoldPlan', GoldPlanSchema);

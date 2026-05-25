const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  department:      { type: String },
  location:        { type: String },
  job_type:        { type: String, default: 'Full-time' },
  description:     { type: String },
  requirements:    { type: [String], default: [] },
  responsibilities:{ type: [String], default: [] },
  isActive:        { type: Boolean, default: true },
  createdBy:       { type: String },
  createdAt:       { type: Date, default: Date.now },
});

module.exports = mongoose.model('Career', CareerSchema);

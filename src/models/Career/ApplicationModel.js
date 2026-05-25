const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  firstName:   { type: String, required: true },
  lastName:    { type: String },
  email:       { type: String, required: true },
  phone:       { type: String },
  position:    { type: String },
  experience:  { type: String },
  branch:      { type: String },
  status:      { type: String, default: 'New' },
  notes:       { type: String },
  resumeUrl:   { type: String },
  appliedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);

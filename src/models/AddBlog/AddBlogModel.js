const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  body: { type: String },
  imageUrl: String,
  blog_type: String,
  isActive: { type: Boolean, default: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  lang: { type: String },
  // SEO fields
  meta_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  canonical_url: { type: String },
});

const Brand = mongoose.model('Blogs', BrandSchema);

module.exports = Brand;

const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  url: { type: String, unique: true },
  image: String,
  category: String,
  publisher: String,
  source: String,
  publishedAt: Date,
  hash: String,
  language: { type: String, default: "en" },
}, { timestamps: true });

articleSchema.index({ url: 1 }, { unique: true });
articleSchema.index({ hash: 1 });
articleSchema.index({ publishedAt: -1 });
articleSchema.index({ language: 1 });

module.exports = mongoose.model("Article", articleSchema);
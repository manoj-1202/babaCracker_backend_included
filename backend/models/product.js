const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  actualPrice: { type: Number, required: true },
  ourPrice: { type: Number, required: true },
  per: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  array: [Object],
});

module.exports = mongoose.model("Product", productsSchema);

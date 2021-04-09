const router = require("express").Router();
const Product = require("../model/Product");

router.get("/", async (req, res) => {
  const result = await Product.findOne({});
  res.send(result);
});

module.exports = router;

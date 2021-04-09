const router = require("express").Router();
const Product = require("../model/Product");
const auth = require("../Routes/verificationToken");

router.get("/", auth, async (req, res) => {
  const result = await Product.findOne({});
  res.send(result);
});

module.exports = router;

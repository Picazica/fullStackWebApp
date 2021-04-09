const router = require("express").Router();
const User = require("../model/User");

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password doesnt exist");
  const validatePassword = await User.findOne({
    password: req.body.password,
  });
  if (!validatePassword)
    return res.status(400).send("Either password or email are wrong");
  res.send("Ok");
});

module.exports = router;

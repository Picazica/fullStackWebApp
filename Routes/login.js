const router = require("express").Router();
const User = require("../model/User");
const { loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.detais[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password doesnt exist");

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword)
    return res.status(400).send("Either password or email are wrong");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth_token", token).send(token);
});

module.exports = router;

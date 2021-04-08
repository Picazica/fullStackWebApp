const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/User");
const Product = require("./model/Product");
const fs = require("fs");

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected")
);

app.use(express.json());

app.post("/api/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password doesnt exist");
  const validatePassword = await User.findOne({
    password: req.body.password,
  });
  if (!validatePassword)
    return res.status(400).send("Either password or email are wrong");
  res.send("Ok");
});

app.get("/api/products", async (req, res) => {
  const result = await Product.findOne({});
  res.send(result);
});

app.listen(5000, () => console.log("server started"));

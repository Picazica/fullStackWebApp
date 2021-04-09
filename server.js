const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const registerRoute = require("./Routes/register");
const loginRoute = require("./Routes/login");
const productRoute = require("./Routes/products");
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected")
);

app.use(express.json());
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/products", productRoute);

app.listen(5000, () => console.log("server started"));

const express = require("express");
const cors = require("cors");

const userRoutes =
require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes); // use routes using this api

module.exports = app;
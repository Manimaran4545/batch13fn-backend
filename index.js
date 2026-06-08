const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const user = require("./Routes/User");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/user", user);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database"))
.catch((err) => console.log("Error connecting to database", err));

module.exports = app;
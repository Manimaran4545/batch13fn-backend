const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const user = require("./Routes/User");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to database");

    app.use("/user", user);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch((err) => {
    console.error("Error connecting to database", err);
});
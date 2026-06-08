const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const user = require('./Routes/User');
app.use(express.json());
const task = require('./Routes/Task');
const cors = require('cors');
app.use(cors());



app.get("/", (req, res) => {
    res.send('Hello World!');
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
} );

// User Route
// app.use("/user", userRoute);

mongoose.connect("mongodb://manimaran:manimara@ac-3bfedgn-shard-00-00.ottu39z.mongodb.net:27017,ac-3bfedgn-shard-00-01.ottu39z.mongodb.net:27017,ac-3bfedgn-shard-00-02.ottu39z.mongodb.net:27017/?ssl=true&replicaSet=atlas-12vpfw-shard-0&authSource=admin&appName=batch13an")
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.error("Error connecting to database", err);
});
// Server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

app.use("/user", user);
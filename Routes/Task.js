const express= require("express");
const router = express.Router();
const Task = require("../Schema/Task");

// Post request
router.post("/create", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send({message: "Task created successfully", task});
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({message: "Error creating task", error: error.message});
    }   
});
// get user by ID
router.get("/task/:userid", async (req, res) => {
    try{
        const tasks = await Task.find({userId: req.params.userId});
        res.status(200).send({message: "Tasks fetched successfully", tasks});
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({message: "Error fetching tasks", error: error.message});  

    }
});

module.exports = router;
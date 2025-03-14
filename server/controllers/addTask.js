const mongoose = require("mongoose");
const addTask = async (req, res) => {
  const taskModel = mongoose.model("task");
  const { task, completed } = req.body;

  await taskModel.create({
    task: task,
    completed: completed,
  });
  res.status(200).json({
    message: "Task added successfully",
    data: task,
  });
};
module.exports = addTask;

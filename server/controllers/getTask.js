const mongoose = require("mongoose");
const getTask = async (req, res) => {
  const taskModel = mongoose.model("task");

  const tasks = await taskModel.find({});
  if (!tasks) throw new Error("No tasks found");

  res.status(200).json({
    message: "Get task",
    data: tasks,
  });
};
module.exports = getTask;

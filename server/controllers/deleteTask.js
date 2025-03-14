const mongoose = require("mongoose");
const deleteTask = async (req, res) => {
  const taskModel = mongoose.model("task");
  const id = req.params.taskId;

  const task = taskModel.findOne({
    _id: id,
  });
  if (!task) throw "Task not found";

  await taskModel.deleteOne({
    _id: id,
  });

  res.status(200).json({
    message: "Task deleted successfully",
    data: id,
  });
};
module.exports = deleteTask;

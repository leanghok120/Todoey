import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  task: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

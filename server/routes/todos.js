import express from "express";
import Task from "../models/Task.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const task = new Task({
      userId: req.user.id,
      task: req.body.task,
    });
    await task.save();
    res.json("Task added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOne({
      userId: req.user.id,
      _id: req.params.id,
    });
    if (!task) return res.status(404).json("Task not found!");

    await Task.deleteOne(task);
    res.json("Task deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

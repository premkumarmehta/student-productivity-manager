const Task = require("../models/Task");

// ==============================
// CREATE TASK
// ==============================
exports.createTask = async (req, res) => {
  try {

    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const {
      title,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      priority,
      dueDate,
      userId: req.user.id,
    });

    console.log("TASK SAVED:", task);

    res.status(201).json(task);

  } catch (error) {
    console.log(
      "CREATE TASK ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};
// ==============================
// GET TASKS (Logged-in User)
// ==============================
exports.getTasks = async (req, res) => {
  try {
    console.log(
      "FETCH TASKS FOR USER:",
      req.user.id
    );

    const tasks = await Task.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    console.log(
      "TASKS FOUND:",
      tasks.length
    );

    res.status(200).json(tasks);

  } catch (error) {
    console.log(
      "GET TASKS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// UPDATE TASK (Toggle Complete)
// ==============================
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Security Check
    if (
      task.userId.toString() !==
      req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update fields if provided
const {
  title,
  priority,
  dueDate,
} = req.body || {};

// Update fields if provided
task.title =
  title || task.title;

task.priority =
  priority ||
  task.priority;

task.dueDate =
  dueDate ||
  task.dueDate;

// If no body fields sent, toggle completion
if (
  !title &&
  !priority &&
  !dueDate
) {
  task.completed =
    !task.completed;
}

    const updatedTask =
      await task.save();

    res.status(200).json(
      updatedTask
    );

  } catch (error) {
    console.log(
      "UPDATE TASK ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};
// ==============================
// DELETE TASK
// ==============================
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Security Check
    if (
      task.userId.toString() !==
      req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted",
    });

  } catch (error) {
    console.log("DELETE TASK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
import Task from "../models/taskModels.js";

// Logic for new task
const newTask = async (req, res) => {
  try {
    // 1) Extract data from the body
    const { title, description, due_date } = req.body;

    // 2) validation on the incoming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title or description not found" });
    }

    // Create a new task
    const newTask = await Task.create({ title, description, due_date });

    // Give 200ok response
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: "failed to create a task",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      tasks,
      message: "fetched all tasks successfully",
    });
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id doesn't exist",
      });
    }
    const updateTask = await Task.findByIdAndUpdate(
      id,
      { title, description, due_date: due_date ?? null },
      { returnDocument: "after" }
    );
    res.status(200).json({
      success: true,
      updateTask,
      message: "task updated successfully",
    });
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    res.status(400).json({
      success: false,
      message: "Failed to update the task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id doesn't exist",
      });
    }
    const deleteTask = await Task.findOneAndDelete(id);
    res.status(200).json({
      success: true,
      deleteTask,
      message: "task deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete the task", error);
    res.status(400).json({
      success: false,
      message: "Failed to delete the task",
    });
  }
};

export { newTask, getTasks, updateTask, deleteTask };

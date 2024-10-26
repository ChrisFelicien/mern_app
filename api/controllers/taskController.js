import Task from "../models/taskModel.js";
import asyncErrorHandler from "./../utils/asyncErrorHandler.js";

export const getAllTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    result: tasks.length,
    data: { tasks }
  });
});

export const getSingle = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

export const updateTask = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id);
  res.status(204).json();
});

export const deleteTask = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  res.status(204).json();
});

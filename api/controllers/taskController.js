import Task from "../models/taskModel.js";
import AppError from "../utils/AppError.js";
import asyncErrorHandler from "./../utils/asyncErrorHandler.js";
import validator from "validator";

export const getAllTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    result: tasks.length,
    data: { tasks }
  });
});

export const getSingleTask = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!validator.isMongoId(id)) {
    return next(new AppError("This id is invalid", 400));
  }

  const task = await Task.findById(id);

  if (!task) {
    return next(new AppError("No task found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

export const createTask = asyncErrorHandler(async (req, res, next) => {
  const newTask = await Task.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      task: newTask
    }
  });
});

export const updateTask = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!validator.isMongoId(id)) {
    return next(new AppError("This id is invalid", 400));
  }
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      task: updatedTask
    }
  });
});

export const deleteTask = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!validator.isMongoId(id)) {
    return next(new AppError("This id is invalid", 400));
  }
  await Task.findByIdAndDelete(id);
  res.status(204).json();
});

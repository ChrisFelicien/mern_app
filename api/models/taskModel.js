import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please provide a task title"],
      min: 6
    },
    status: {
      type: String,
      enum: ["started", "done", "waiting"],
      default: "waiting"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },
    startedAt: {
      type: Date,
      default: undefined
    },
    endAt: {
      type: Date,
      default: undefined
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

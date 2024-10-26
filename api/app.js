import express from "express";
import morgan from "morgan";
import AppError from "./utils/AppError.js";
import globalErrorController from "./controllers/globalErrorController.js";
import usersRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} path not found in this server`, 404));
});

app.use(globalErrorController);

export default app;

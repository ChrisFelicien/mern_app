import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SERCRET, {
    expiresIn: process.env.JWT_EXPIRE_IN
  });
};

export const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide a email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(user);

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 400));
  }

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    user
  });
});

export const createUser = asyncErrorHandler(async (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!email || !name || !password || !confirmPassword) {
    return next(
      new AppError(
        "Please provide name, email password and confirm password",
        401
      )
    );
  }
  const user = await User.create({ email, name, password, confirmPassword });
  const token = createToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user
    }
  });
});

export const protect = asyncErrorHandler((req, res, next) => {
  let token;
});

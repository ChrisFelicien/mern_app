import express from "express";
import { createUser, loginUser } from "../controllers/authentication.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", createUser);

export default router;


import { authMiddleware } from "../middleware/authMiddleware.js";
import express from 'express'
const router = express.Router()

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

export default router

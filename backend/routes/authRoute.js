import express from 'express'
import { register, login } from '../controllers/authControllers.js'

const router = express.Router()

// Routes d'authentification
router.post('/register', register)
router.post('/login', login)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router 
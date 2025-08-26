import express from 'express'
import { registerAdmin, loginAdmin } from '../controllers/AdminAuthController.js'

const router = express.Router()

// Routes d'authentification
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router
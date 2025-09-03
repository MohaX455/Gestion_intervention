
import { authMiddleware, verifyRole } from "../middleware/authMiddleware.js";
import express from 'express'
const router = express.Router()

router.get("/admin", authMiddleware, verifyRole(['admin']), (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

router.get('/technician', authMiddleware, verifyRole(['technician']), (req, res) => {
    res.json({ message: "Welcome to the technician dashboard" })
})

router.get('/secretary', authMiddleware, verifyRole(['secretary']), (req, res) => {
    res.json({ message: "Welcome to the secretary dashboard" })
})

router.get('/me', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});


export default router
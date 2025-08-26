
import express from "express";
import dotenv from 'dotenv'
import db from './database/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute.js'
import dashboard from './routes/dashboard.js'
import cors from 'cors'

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors({
    origin: "http://127.0.0.1:5501",
    credentials: true
}))
app.use(cookieParser())

// Test backend
app.get('/', (req, res) => {
    res.send('API backend en ligne !')
})

// Routes
app.use('/admin/auth', authRoutes)
app.use('/admin', dashboard)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`)
})

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import { config } from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js"

// Routes
import authRoutes from "./routes/authRoutes.js"
import phoneRoutes from "./routes/phoneRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import activityRoutes from "./routes/activityRoutes.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/phones", phoneRoutes)
app.use("/api/users", userRoutes)
app.use("/api/activities", activityRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" })
})

// Error Handler
app.use(errorHandler)

// Start Server
app.listen(config.PORT, () => {
  console.log(`[v0] Server running on port ${config.PORT}`)
})

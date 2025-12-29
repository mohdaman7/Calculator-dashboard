import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import routes from "./routes/index.js"

dotenv.config()

const app = express()

// Security middleware
app.use(helmet())

// Rate limiting - disabled for now
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 500,
//   message: { error: "Too many requests, please try again later." }
// })
// app.use("/api/", limiter)

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))

// Body parser
app.use(express.json({ limit: "10kb" }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/admin-dashboard")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err))

// Routes - support both /api and root paths
app.use("/api", routes)
app.use("/", routes)

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

app.get("/", (req, res) => {
  res.send("✅ API is working");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/health`)
})

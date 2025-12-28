import express from "express"
import { ActivityLog } from "../models/index.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// Get activity logs
router.get("/", verifyToken, async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(100)
    res.json(logs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

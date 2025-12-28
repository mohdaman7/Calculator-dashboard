import express from "express"
import { Admin, User } from "../models/index.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// Get all admins
router.get("/", verifyToken, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: -1 })
    res.json(admins)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Grant admin access
router.post("/grant/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isAdmin: true }, { new: true })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Revoke admin access
router.post("/revoke/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isAdmin: false }, { new: true })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

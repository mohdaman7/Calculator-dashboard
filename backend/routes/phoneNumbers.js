import express from "express"
import { PhoneNumber } from "../models/index.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// Get all phone numbers (protected)
router.get("/", verifyToken, async (req, res) => {
  try {
    const phones = await PhoneNumber.find().sort({ createdAt: -1 })
    res.json(phones)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add phone number (protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { phoneNumber, userName } = req.body
    const phone = await PhoneNumber.create({ phoneNumber, userName })
    res.status(201).json(phone)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update phone number (protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { phoneNumber, userName, status } = req.body
    const updatedPhone = await PhoneNumber.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, userName, status, updatedAt: new Date() },
      { new: true }
    )
    res.json(updatedPhone)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete phone number (protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await PhoneNumber.findByIdAndDelete(req.params.id)
    res.json({ message: "Phone number deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Check phone number (public - for PWA/App verification)
router.post("/verify", async (req, res) => {
  try {
    const { phoneNumber } = req.body
    
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "Phone number is required" })
    }

    const phone = await PhoneNumber.findOne({ phoneNumber, status: "active" })

    if (phone) {
      res.json({ 
        success: true, 
        whitelisted: true, 
        message: "Phone number is whitelisted",
        userName: phone.userName || null
      })
    } else {
      res.status(403).json({ 
        success: false, 
        whitelisted: false, 
        message: "Phone number is not whitelisted" 
      })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

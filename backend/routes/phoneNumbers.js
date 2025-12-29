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
    const { phoneNumber, userName, countryCode = "+91" } = req.body
    const phone = await PhoneNumber.create({ phoneNumber, userName, countryCode })
    res.status(201).json(phone)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update phone number (protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { phoneNumber, userName, status, countryCode } = req.body
    const updatedPhone = await PhoneNumber.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, userName, status, countryCode, updatedAt: new Date() },
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
    const { phoneNumber, countryCode } = req.body
    
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "Phone number is required" })
    }

    // Normalize phone number - keep only digits
    const normalizedPhone = phoneNumber.replace(/\D/g, "")

    let phone = null

    // If countryCode is provided, search with it
    if (countryCode) {
      phone = await PhoneNumber.findOne({ phoneNumber: normalizedPhone, countryCode, status: "active" })
    }
    
    // If not found or no countryCode provided, search by phone number only
    if (!phone) {
      phone = await PhoneNumber.findOne({ phoneNumber: normalizedPhone, status: "active" })
    }

    // Also try matching last 10 digits (for backward compatibility)
    if (!phone && normalizedPhone.length >= 10) {
      const last10 = normalizedPhone.slice(-10)
      phone = await PhoneNumber.findOne({ 
        phoneNumber: { $regex: last10 + "$" }, 
        status: "active" 
      })
    }

    if (phone) {
      res.json({ 
        success: true, 
        whitelisted: true, 
        message: "Phone number is whitelisted",
        userName: phone.userName || null,
        countryCode: phone.countryCode || "+91"
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

import express from "express"
import bcrypt from "bcryptjs"
import { Admin } from "../models/index.js"
import { generateToken } from "../middleware/auth.js"

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (await Admin.findOne({ email })) {
      return res.status(400).json({ error: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await Admin.create({ email, password: hashedPassword, name })

    const token = generateToken(admin._id)
    res.status(201).json({ token, admin: { _id: admin._id, email: admin.email, name: admin.name } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check env credentials first
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken("env-admin")
      return res.json({ token, admin: { _id: "env-admin", email, name: "Admin" } })
    }

    // Fallback to database admin
    const admin = await Admin.findOne({ email })

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(admin._id)
    res.json({ token, admin: { _id: admin._id, email: admin.email, name: admin.name } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

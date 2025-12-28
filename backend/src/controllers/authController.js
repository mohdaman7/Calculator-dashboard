import Admin from "../models/Admin.js"
import ActivityLog from "../models/ActivityLog.js"
import jwt from "jsonwebtoken"
import { config } from "../config/env.js"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" })
    }

    const admin = await Admin.create({ name, email, password })

    const token = jwt.sign({ id: admin._id, email: admin.email }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    })

    // Log activity
    await ActivityLog.create({
      adminId: admin._id,
      adminEmail: email,
      action: "LOGIN",
      resourceType: "auth",
      status: "success",
      ipAddress: req.ip,
    })

    res.status(201).json({ token, admin })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.matchPassword(password))) {
      await ActivityLog.create({
        adminEmail: email,
        action: "LOGIN",
        resourceType: "auth",
        status: "failed",
        ipAddress: req.ip,
      })
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    })

    // Log activity
    await ActivityLog.create({
      adminId: admin._id,
      adminEmail: email,
      action: "LOGIN",
      resourceType: "auth",
      status: "success",
      ipAddress: req.ip,
    })

    res.json({ token, admin })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

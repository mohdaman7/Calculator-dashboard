import jwt from "jsonwebtoken"
import { config } from "../config/env.js"

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ error: "No token provided" })

    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.adminId = decoded.id
    req.adminEmail = decoded.email
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }
    next()
  }
}

export const logActivity = (action, resourceType) => {
  return async (req, res, next) => {
    req.logData = {
      action,
      resourceType,
      ipAddress: req.ip,
    }
    next()
  }
}

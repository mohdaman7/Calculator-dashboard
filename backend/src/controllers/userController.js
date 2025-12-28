import User from "../models/User.js"
import ActivityLog from "../models/ActivityLog.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("adminId", "name email")
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const grantAdminAccess = async (req, res) => {
  try {
    const { userId } = req.body

    const user = await User.findByIdAndUpdate(userId, { role: "admin", adminId: req.adminId }, { new: true })

    if (!user) return res.status(404).json({ error: "User not found" })

    // Log activity
    await ActivityLog.create({
      adminId: req.adminId,
      adminEmail: req.adminEmail,
      action: "GRANT_ADMIN",
      resourceType: "user",
      resourceId: userId,
      details: `Granted admin access to ${user.email}`,
      ipAddress: req.ip,
    })

    res.json({ message: "Admin access granted", user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const revokeAdminAccess = async (req, res) => {
  try {
    const { userId } = req.body

    const user = await User.findByIdAndUpdate(userId, { role: "user" }, { new: true })

    if (!user) return res.status(404).json({ error: "User not found" })

    // Log activity
    await ActivityLog.create({
      adminId: req.adminId,
      adminEmail: req.adminEmail,
      action: "REVOKE_ADMIN",
      resourceType: "user",
      resourceId: userId,
      details: `Revoked admin access from ${user.email}`,
      ipAddress: req.ip,
    })

    res.json({ message: "Admin access revoked", user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

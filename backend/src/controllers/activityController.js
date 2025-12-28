import ActivityLog from "../models/ActivityLog.js"

export const getActivityLogs = async (req, res) => {
  try {
    const { adminId, action, limit = 50, page = 1 } = req.query

    const filter = {}
    if (adminId) filter.adminId = adminId
    if (action) filter.action = action

    const logs = await ActivityLog.find(filter)
      .populate("adminId", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })

    const total = await ActivityLog.countDocuments(filter)

    res.json({ logs, total, pages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getActivityByAdmin = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ adminId: req.params.adminId }).sort({ createdAt: -1 }).limit(100)

    res.json(logs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

import mongoose from "mongoose"

const activityLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  adminEmail: String,
  action: { type: String, required: true },
  targetType: String,
  targetId: String,
  targetData: mongoose.Schema.Types.Mixed,
  changes: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
})

export default mongoose.model("ActivityLog", activityLogSchema)

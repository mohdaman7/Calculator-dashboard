import mongoose from "mongoose"

const activityLogSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    adminEmail: { type: String, required: true },
    action: {
      type: String,
      enum: ["ADD_PHONE", "EDIT_PHONE", "DELETE_PHONE", "GRANT_ADMIN", "REVOKE_ADMIN", "LOGIN"],
    },
    resourceType: { type: String, enum: ["phone", "user", "admin", "auth"] },
    resourceId: { type: String },
    details: { type: String },
    ipAddress: { type: String },
    status: { type: String, default: "success", enum: ["success", "failed"] },
  },
  { timestamps: true },
)

export default mongoose.model("ActivityLog", activityLogSchema)

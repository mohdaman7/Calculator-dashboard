import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin", enum: ["admin", "super-admin"] },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
})

export default mongoose.model("Admin", adminSchema)

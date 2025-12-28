import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isWhitelisted: { type: Boolean, default: false },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
)

export default mongoose.model("User", userSchema)

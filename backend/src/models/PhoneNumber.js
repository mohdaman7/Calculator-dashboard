import mongoose from "mongoose"

const phoneNumberSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
)

export default mongoose.model("PhoneNumber", phoneNumberSchema)

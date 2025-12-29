import mongoose from "mongoose"

const phoneNumberSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  countryCode: { type: String, default: "+91" },
  userName: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

phoneNumberSchema.index({ phoneNumber: 1, countryCode: 1 }, { unique: true })

export default mongoose.model("PhoneNumber", phoneNumberSchema)

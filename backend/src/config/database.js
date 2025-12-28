import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("[v0] MongoDB Connected")
  } catch (error) {
    console.error("[v0] Database connection failed:", error)
    process.exit(1)
  }
}

export default connectDB

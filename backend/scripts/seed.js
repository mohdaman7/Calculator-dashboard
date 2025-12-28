import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import Admin from "../src/models/Admin.js"
import PhoneNumber from "../src/models/PhoneNumber.js"
import User from "../src/models/User.js"

dotenv.config()

const seedDatabase = async () => {
  try {
    console.log("[v0] Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/admin-dashboard")
    console.log("[v0] Connected successfully")

    // Clear existing data
    console.log("[v0] Clearing existing data...")
    await Admin.deleteMany({})
    await PhoneNumber.deleteMany({})
    await User.deleteMany({})

    // Create admin
    console.log("[v0] Creating admin user...")
    const hashedPassword = await bcryptjs.hash("admin123", 10)
    const admin = await Admin.create({
      name: "System Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "super-admin",
      isActive: true,
    })
    console.log("[v0] Admin created:", admin.email)

    // Create sample phone numbers
    console.log("[v0] Creating sample phone numbers...")
    const phones = await PhoneNumber.insertMany([
      {
        phoneNumber: "9876543210",
        userName: "John Doe",
        isActive: true,
        addedBy: admin._id,
      },
      {
        phoneNumber: "8765432109",
        userName: "Jane Smith",
        isActive: true,
        addedBy: admin._id,
      },
      {
        phoneNumber: "7654321098",
        userName: "Mike Johnson",
        isActive: true,
        addedBy: admin._id,
      },
    ])
    console.log("[v0] Created", phones.length, "phone numbers")

    // Create sample users
    console.log("[v0] Creating sample users...")
    const users = await User.insertMany([
      {
        name: "User One",
        email: "user1@example.com",
        phoneNumber: "9876543210",
        role: "user",
        isWhitelisted: true,
      },
      {
        name: "User Two",
        email: "user2@example.com",
        phoneNumber: "8765432109",
        role: "user",
        isWhitelisted: true,
      },
    ])
    console.log("[v0] Created", users.length, "users")

    console.log("[v0] Database seeded successfully!")
    console.log("\nTest Credentials:")
    console.log("Email: admin@example.com")
    console.log("Password: admin123")

    await mongoose.connection.close()
    console.log("[v0] Connection closed")
    process.exit(0)
  } catch (error) {
    console.error("[v0] Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()

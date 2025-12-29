import express from "express"
import authRoutes from "./auth.js"
import phoneNumberRoutes from "./phoneNumbers.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/phone-numbers", phoneNumberRoutes)

export default router

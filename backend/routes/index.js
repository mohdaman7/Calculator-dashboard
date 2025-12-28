import express from "express"
import authRoutes from "./auth.js"
import phoneNumberRoutes from "./phoneNumbers.js"
import adminRoutes from "./admins.js"
import activityLogRoutes from "./activityLogs.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/phone-numbers", phoneNumberRoutes)
router.use("/admins", adminRoutes)
router.use("/activity-logs", activityLogRoutes)

export default router

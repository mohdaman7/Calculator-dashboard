import express from "express"
import { authenticate } from "../middleware/auth.js"
import { getActivityLogs, getActivityByAdmin } from "../controllers/activityController.js"

const router = express.Router()

router.get("/", authenticate, getActivityLogs)
router.get("/admin/:adminId", authenticate, getActivityByAdmin)

export default router

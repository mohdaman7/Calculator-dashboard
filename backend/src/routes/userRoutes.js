import express from "express"
import { authenticate } from "../middleware/auth.js"
import { getAllUsers, grantAdminAccess, revokeAdminAccess } from "../controllers/userController.js"

const router = express.Router()

router.get("/", authenticate, getAllUsers)
router.post("/grant-admin", authenticate, grantAdminAccess)
router.post("/revoke-admin", authenticate, revokeAdminAccess)

export default router

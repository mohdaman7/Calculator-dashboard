import express from "express"
import { authenticate } from "../middleware/auth.js"
import { getAllPhones, getPhoneById, addPhone, updatePhone, deletePhone } from "../controllers/phoneController.js"

const router = express.Router()

router.get("/", authenticate, getAllPhones)
router.get("/:id", authenticate, getPhoneById)
router.post("/", authenticate, addPhone)
router.put("/:id", authenticate, updatePhone)
router.delete("/:id", authenticate, deletePhone)

export default router

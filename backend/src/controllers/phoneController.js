import PhoneNumber from "../models/PhoneNumber.js"
import ActivityLog from "../models/ActivityLog.js"

export const getAllPhones = async (req, res) => {
  try {
    const phones = await PhoneNumber.find().populate("addedBy", "name email")
    res.json(phones)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getPhoneById = async (req, res) => {
  try {
    const phone = await PhoneNumber.findById(req.params.id).populate("addedBy", "name email")
    if (!phone) return res.status(404).json({ error: "Phone not found" })
    res.json(phone)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const addPhone = async (req, res) => {
  try {
    const { phoneNumber, userName } = req.body

    const existingPhone = await PhoneNumber.findOne({ phoneNumber })
    if (existingPhone) {
      return res.status(400).json({ error: "Phone number already exists" })
    }

    const phone = await PhoneNumber.create({
      phoneNumber,
      userName,
      addedBy: req.adminId,
    })

    // Log activity
    await ActivityLog.create({
      adminId: req.adminId,
      adminEmail: req.adminEmail,
      action: "ADD_PHONE",
      resourceType: "phone",
      resourceId: phone._id,
      details: `Added ${phoneNumber} for ${userName}`,
      ipAddress: req.ip,
    })

    res.status(201).json(phone)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updatePhone = async (req, res) => {
  try {
    const { phoneNumber, userName, isActive } = req.body

    const phone = await PhoneNumber.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, userName, isActive, lastModifiedBy: req.adminId },
      { new: true },
    )

    if (!phone) return res.status(404).json({ error: "Phone not found" })

    // Log activity
    await ActivityLog.create({
      adminId: req.adminId,
      adminEmail: req.adminEmail,
      action: "EDIT_PHONE",
      resourceType: "phone",
      resourceId: phone._id,
      details: `Updated phone number ${phoneNumber}`,
      ipAddress: req.ip,
    })

    res.json(phone)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deletePhone = async (req, res) => {
  try {
    const phone = await PhoneNumber.findByIdAndDelete(req.params.id)
    if (!phone) return res.status(404).json({ error: "Phone not found" })

    // Log activity
    await ActivityLog.create({
      adminId: req.adminId,
      adminEmail: req.adminEmail,
      action: "DELETE_PHONE",
      resourceType: "phone",
      resourceId: req.params.id,
      details: `Deleted phone number ${phone.phoneNumber}`,
      ipAddress: req.ip,
    })

    res.json({ message: "Phone deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

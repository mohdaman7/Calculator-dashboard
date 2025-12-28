import jwt from "jsonwebtoken"

export const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "24h" })
}

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "No token provided" })

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" })
    req.adminId = decoded.adminId
    next()
  })
}

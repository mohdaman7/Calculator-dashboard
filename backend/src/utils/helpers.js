export const generateToken = (payload, secret, expiresIn) => {
  const jwt = require("jsonwebtoken")
  return jwt.sign(payload, secret, { expiresIn })
}

export const formatResponse = (success, data, message = "") => {
  return {
    success,
    data,
    message,
    timestamp: new Date(),
  }
}

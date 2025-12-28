export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10,15}$/
  return regex.test(phone)
}

export const validatePassword = (password) => {
  return password && password.length >= 6
}

export const validateForm = (data, schema) => {
  const errors = {}
  for (const [key, validator] of Object.entries(schema)) {
    if (!validator(data[key])) {
      errors[key] = `Invalid ${key}`
    }
  }
  return errors
}

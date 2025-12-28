import { format } from "date-fns"

export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  return format(new Date(date), formatStr)
}

export const formatDateTime = (date) => {
  return format(new Date(date), "MMM dd, yyyy HH:mm:ss")
}

export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
}

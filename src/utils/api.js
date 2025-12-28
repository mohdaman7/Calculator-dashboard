export const getAuthHeader = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const handleApiError = (error) => {
  console.error("[v0] API Error:", error)
  if (error.response?.status === 401) {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    window.location.href = "/"
  }
  throw error
}

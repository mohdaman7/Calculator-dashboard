const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const getToken = () => localStorage.getItem("adminToken")

export const activityService = {
  async getActivityLogs(filters = {}) {
    const params = new URLSearchParams(filters)
    const response = await fetch(`${API_BASE_URL}/activities?${params}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch activity logs")
    }

    return response.json()
  },

  async getActivityByAdmin(adminId) {
    const response = await fetch(`${API_BASE_URL}/activities/admin/${adminId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch admin activities")
    }

    return response.json()
  },
}

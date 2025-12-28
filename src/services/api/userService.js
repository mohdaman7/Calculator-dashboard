const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const getToken = () => localStorage.getItem("adminToken")

export const userService = {
  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    return response.json()
  },

  async grantAdminAccess(userId) {
    const response = await fetch(`${API_BASE_URL}/users/grant-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to grant admin access")
    }

    return response.json()
  },

  async revokeAdminAccess(userId) {
    const response = await fetch(`${API_BASE_URL}/users/revoke-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to revoke admin access")
    }

    return response.json()
  },
}

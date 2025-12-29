const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const getToken = () => localStorage.getItem("adminToken")

export const phoneService = {
  async getAllPhones() {
    const response = await fetch(`${API_BASE_URL}/phone-numbers`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch phones")
    }

    return response.json()
  },

  async getPhoneById(id) {
    const response = await fetch(`${API_BASE_URL}/phone-numbers/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch phone")
    }

    return response.json()
  },

  async addPhone(data) {
    const response = await fetch(`${API_BASE_URL}/phone-numbers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to add phone")
    }

    return response.json()
  },

  async updatePhone(id, data) {
    const response = await fetch(`${API_BASE_URL}/phone-numbers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update phone")
    }

    return response.json()
  },

  async deletePhone(id) {
    const response = await fetch(`${API_BASE_URL}/phone-numbers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete phone")
    }

    return response.json()
  },
}

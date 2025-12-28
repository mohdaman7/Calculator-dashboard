"use client"

import { useState, useEffect } from "react"

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const adminData = localStorage.getItem("adminUser")

    if (token && adminData) {
      setIsAuthenticated(true)
      setAdmin(JSON.parse(adminData))
    }
    setIsLoading(false)
  }, [])

  return { isAuthenticated, isLoading, admin }
}

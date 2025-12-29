"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/dashboard/sidebar"
import PhoneNumbersView from "@/components/dashboard/views/phone-numbers-view"
import { LogOut, User } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminUser, setAdminUser] = useState(null)
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const admin = localStorage.getItem("adminUser")

    if (token && admin) {
      setIsAuthenticated(true)
      try {
        setAdminUser(JSON.parse(admin))
      } catch {
        setAdminUser(null)
      }
      fetchStats(token)
    } else {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }, [])

  const fetchStats = async (token) => {
    try {
      const response = await fetch(`${API_URL}/phone-numbers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        const phones = Array.isArray(data) ? data : []
        setStats({
          total: phones.length,
          active: phones.filter((p) => p.status === "active").length,
          inactive: phones.filter((p) => p.status === "inactive").length,
        })
      }
    } catch (err) {
      console.error("Failed to fetch stats")
    }
  }

  const refreshStats = () => {
    const token = localStorage.getItem("adminToken")
    if (token) fetchStats(token)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative h-16 w-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
          </div>
          <p className="mt-6 text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setIsAuthenticated(false)
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar currentView="phone-numbers" onViewChange={() => {}} stats={stats} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Phone Whitelist Manager</h1>
            <p className="text-xs text-slate-500">Manage your whitelisted phone numbers</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{adminUser?.name || "Admin"}</p>
                <p className="text-[10px] text-slate-500">{adminUser?.email || ""}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950 dark:hover:border-red-900 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-slate-900/50">
          <PhoneNumbersView onDataChange={refreshStats} />
        </main>
      </div>
    </div>
  )
}

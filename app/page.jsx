"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/dashboard/sidebar"
import PhoneNumbersView from "@/components/dashboard/views/phone-numbers-view"
import UsersView from "@/components/dashboard/views/users-view"
import ActivityLogsView from "@/components/dashboard/views/activity-logs-view"
import { LogOut, Bell, Search, User } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState("phone-numbers")
  const [adminUser, setAdminUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const admin = localStorage.getItem("adminUser")

    if (token && admin) {
      setIsAuthenticated(true)
      setAdminUser(JSON.parse(admin))
    } else {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-r-indigo-500 animate-spin animation-delay-150"></div>
          </div>
          <p className="mt-6 text-slate-400 font-medium">Loading dashboard...</p>
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

  const renderView = () => {
    switch (currentView) {
      case "phone-numbers":
        return <PhoneNumbersView />
      case "users":
        return <UsersView />
      case "activity-logs":
        return <ActivityLogsView />
      default:
        return <PhoneNumbersView />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Header */}
        <header className="h-16 border-b border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-xl border border-border/50 bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="h-8 w-px bg-border/50"></div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-foreground">{adminUser?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">{adminUser?.email || "admin@example.com"}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="ml-2 rounded-xl border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}

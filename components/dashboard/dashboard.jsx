"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "./Sidebar"
import PhoneNumbersView from "./views/PhoneNumbersView"
import UsersView from "./views/UsersView"
import ActivityLogsView from "./views/ActivityLogsView"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState("phones")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-border bg-card p-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button 
              onClick={() => setSidebarOpen(true)} 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="shrink-0">
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {activeView === "phones" && <PhoneNumbersView />}
          {activeView === "users" && <UsersView />}
          {activeView === "logs" && <ActivityLogsView />}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "./Sidebar"
import PhoneNumbersView from "./views/PhoneNumbersView"
import UsersView from "./views/UsersView"
import ActivityLogsView from "./views/ActivityLogsView"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState("phones")

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeView === "phones" && <PhoneNumbersView />}
          {activeView === "users" && <UsersView />}
          {activeView === "logs" && <ActivityLogsView />}
        </div>
      </div>
    </div>
  )
}

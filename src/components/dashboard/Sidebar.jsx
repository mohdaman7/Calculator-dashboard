"use client"

import { Phone, Users, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: "phones", label: "Phone Numbers", icon: Phone },
    { id: "users", label: "Users & Admins", icon: Users },
    { id: "logs", label: "Activity Logs", icon: Activity },
  ]

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            onClick={() => setActiveView(id)}
            variant={activeView === id ? "default" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </nav>
    </div>
  )
}

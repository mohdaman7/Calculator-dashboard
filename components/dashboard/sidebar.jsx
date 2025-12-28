"use client"

import { Phone, Users, Activity, Shield, LogOut } from "lucide-react"

export default function Sidebar({ currentView, onViewChange }) {
  const menuItems = [
    { id: "phone-numbers", label: "Phone Numbers", icon: Phone },
    { id: "users", label: "Users & Admins", icon: Users },
    { id: "activity-logs", label: "Activity Logs", icon: Activity },
  ]

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col min-h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-xl tracking-tight">Admin</h1>
            <p className="text-xs text-slate-400 font-medium">Control Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-4">Navigation</p>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-sm group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? "bg-white/20" : "bg-slate-800 group-hover:bg-slate-700"
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
          <p className="text-xs text-slate-400 text-center">
            <span className="text-blue-400 font-semibold">Premium</span> Dashboard
          </p>
        </div>
      </div>
    </div>
  )
}

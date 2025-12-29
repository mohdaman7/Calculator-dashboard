"use client"

import { Phone, Shield } from "lucide-react"

export default function Sidebar({ currentView, onViewChange, stats = { total: 0, active: 0, inactive: 0 } }) {
  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col min-h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/10">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-xl tracking-tight">Admin Panel</h1>
            <p className="text-xs text-slate-500 font-medium">Phone Management</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4 mb-4">Dashboard</p>
        <button
          onClick={() => onViewChange("phone-numbers")}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 font-medium text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 ring-1 ring-white/10"
        >
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
            <Phone className="h-4 w-4" />
          </div>
          <div className="text-left">
            <span className="block">Phone Numbers</span>
            <span className="text-[10px] text-blue-200 font-normal">Manage whitelist</span>
          </div>
        </button>
      </nav>

      {/* Stats Card */}
      <div className="p-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Stats</p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-[10px] text-slate-500">Total</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.active}</div>
              <div className="text-[10px] text-slate-500">Active</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-500">{stats.inactive}</div>
              <div className="text-[10px] text-slate-500">Inactive</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

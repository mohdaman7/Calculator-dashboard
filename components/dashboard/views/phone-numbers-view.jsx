"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import PhoneNumberForm from "../forms/phone-number-form"
import PhoneNumberTable from "../tables/phone-number-table"
import { Plus, Phone, CheckCircle, XCircle, RefreshCw, Search, X, ShieldCheck, Zap } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function PhoneNumbersView({ onDataChange }) {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingPhone, setEditingPhone] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken")
    }
    return null
  }

  useEffect(() => {
    fetchPhoneNumbers()
  }, [])

  const fetchPhoneNumbers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/phone-numbers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setPhoneNumbers(Array.isArray(data) ? data : [])
      setError("")
      if (onDataChange) onDataChange()
    } catch (err) {
      setError("Failed to fetch phone numbers")
      setPhoneNumbers([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this phone number?")) return

    try {
      await fetch(`${API_URL}/phone-numbers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setPhoneNumbers(phoneNumbers.filter((p) => p._id !== id))
      if (onDataChange) onDataChange()
    } catch (err) {
      setError("Failed to delete phone number")
    }
  }

  const handleAddOrEdit = async (formData) => {
    // Check for duplicates
    const isDuplicate = phoneNumbers.some(p =>
      p.phoneNumber === formData.phoneNumber &&
      p.countryCode === formData.countryCode &&
      (!editingPhone || p._id !== editingPhone._id)
    )

    if (isDuplicate) {
      setError(`Phone number ${formData.countryCode} ${formData.phoneNumber} is already whitelisted`)
      return
    }

    try {
      if (editingPhone) {
        const response = await fetch(`${API_URL}/phone-numbers/${editingPhone._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(formData),
        })
        const updated = await response.json()
        setPhoneNumbers(phoneNumbers.map((p) => (p._id === updated._id ? updated : p)))
      } else {
        const response = await fetch(`${API_URL}/phone-numbers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(formData),
        })
        const newPhone = await response.json()
        setPhoneNumbers([newPhone, ...phoneNumbers])
      }
      setShowForm(false)
      setEditingPhone(null)
      setError("")
      if (onDataChange) onDataChange()
    } catch (err) {
      setError("An error occurred while saving. Please try again.")
    }
  }

  const filteredPhones = useMemo(() => {
    return phoneNumbers.filter((phone) => {
      const matchesSearch = searchQuery === "" ||
        phone.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.countryCode?.includes(searchQuery)

      const matchesStatus = statusFilter === "all" || phone.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [phoneNumbers, searchQuery, statusFilter])

  const stats = {
    total: phoneNumbers.length,
    active: phoneNumbers.filter((p) => p.status === "active").length,
    inactive: phoneNumbers.filter((p) => p.status === "inactive").length,
  }

  const clearSearch = () => {
    setSearchQuery("")
    setStatusFilter("all")
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      {/* Premium Hub Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            Whitelist Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Control secure access for global team members</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={fetchPhoneNumbers}
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4.5 w-4.5 text-slate-500 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button
            onClick={() => {
              setEditingPhone(null)
              setShowForm(true)
              setError("")
            }}
            className="h-11 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Whitelist Entry
          </Button>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <Phone className="h-24 w-24" />
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Verified</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">{stats.total}</p>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">GLOBAL</span>
              </div>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800/50">
              <Phone className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="h-24 w-24" />
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Active Access</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none">{stats.active}</p>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50">
              <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <Zap className="h-24 w-24" />
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Restricted</p>
              <p className="text-4xl font-black text-slate-900 dark:text-slate-300 leading-none">{stats.inactive}</p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
              <XCircle className="h-7 w-7 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel: Search & Filter */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-4 sticky top-4 z-10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter by phone, name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-12 border-none rounded-2xl focus:outline-none bg-slate-100/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 transition-all ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/50 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-slate-500 dark:text-slate-300" />
              </button>
            )}
          </div>

          {/* Premium Filter Toggle */}
          <div className="flex bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-1.5 ring-1 ring-slate-200 dark:ring-slate-700">
            {[
              { id: "all", label: "All Members" },
              { id: "active", label: "Active Only" },
              { id: "inactive", label: "Restricted" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${statusFilter === tab.id
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm scale-100"
                  : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 scale-95"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Form Display with Motion */}
      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <PhoneNumberForm
            phone={editingPhone}
            onSubmit={handleAddOrEdit}
            onCancel={() => {
              setShowForm(false)
              setEditingPhone(null)
              setError("")
            }}
          />
        </div>
      )}

      {/* Error Toast-like Alert */}
      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-3xl text-rose-700 dark:text-rose-400 text-sm font-bold flex items-center gap-3 animate-in shake duration-300">
          <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center flex-shrink-0 text-rose-600">
            <XCircle className="h-5 w-5" />
          </div>
          {error}
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative">
        {isLoading ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-24 shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-blue-500/10 border-t-blue-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-blue-600/50" />
                </div>
              </div>
              <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold tracking-widest text-xs uppercase">Establishing Connection...</p>
            </div>
          </div>
        ) : filteredPhones.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-16 shadow-sm border border-slate-100 dark:border-slate-700/50 text-center">
            <div className="bg-slate-50 dark:bg-slate-900/50 h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Search className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-slate-900 dark:text-white font-black text-xl">No whitelist records matched</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xs mx-auto font-medium">Your current search and filter settings did not return any results in our database.</p>
            <button
              onClick={clearSearch}
              className="mt-8 px-6 py-2.5 text-sm bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <PhoneNumberTable
            phones={filteredPhones}
            onEdit={(phone) => {
              setEditingPhone(phone)
              setShowForm(true)
              setError("")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

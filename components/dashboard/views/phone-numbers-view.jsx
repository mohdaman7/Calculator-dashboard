"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import PhoneNumberForm from "../forms/phone-number-form"
import PhoneNumberTable from "../tables/phone-number-table"
import { Plus, Phone, CheckCircle, XCircle, RefreshCw, Search, X, Filter } from "lucide-react"

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
      setError(`Phone number ${formData.countryCode} ${formData.phoneNumber} is already added`)
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
      setError("") // Clear error on success
      if (onDataChange) onDataChange()
    } catch (err) {
      setError("Failed to save phone number")
    }
  }

  // Filter and search logic
  const filteredPhones = useMemo(() => {
    return phoneNumbers.filter((phone) => {
      const matchesSearch = searchQuery === "" ||
        phone.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Compact Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Inactive</p>
              <p className="text-2xl font-bold text-slate-400">{stats.inactive}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by phone number or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-10 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-500"
              >
                <X className="h-3 w-3 text-slate-500 dark:text-slate-300" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === "all"
                  ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === "active"
                  ? "bg-white dark:bg-slate-600 text-green-600 dark:text-green-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter("inactive")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === "inactive"
                  ? "bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={fetchPhoneNumbers}
              variant="outline"
              size="sm"
              className="h-10 rounded-lg"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              onClick={() => {
                setEditingPhone(null)
                setShowForm(true)
                setError("") // Clear any previous error
              }}
              size="sm"
              className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Number
            </Button>
          </div>
        </div>

        {/* Active filters indicator */}
        {(searchQuery || statusFilter !== "all") && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs text-slate-500">Showing {filteredPhones.length} of {phoneNumbers.length}</span>
            {(searchQuery || statusFilter !== "all") && (
              <button
                onClick={clearSearch}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <PhoneNumberForm
          phone={editingPhone}
          onSubmit={handleAddOrEdit}
          onCancel={() => {
            setShowForm(false)
            setEditingPhone(null)
            setError("") // Clear error on cancel
          }}
        />
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-12 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-8 rounded-full border-3 border-blue-500/20 border-t-blue-500 animate-spin"></div>
            <p className="mt-3 text-slate-500 text-sm">Loading...</p>
          </div>
        </div>
      ) : filteredPhones.length === 0 && (searchQuery || statusFilter !== "all") ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
          <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No results found</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
          <button
            onClick={clearSearch}
            className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <PhoneNumberTable
          phones={filteredPhones}
          onEdit={(phone) => {
            setEditingPhone(phone)
            setShowForm(true)
            setError("") // Clear any previous error
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

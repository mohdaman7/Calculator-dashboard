"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import PhoneNumberForm from "../forms/phone-number-form"
import PhoneNumberTable from "../tables/phone-number-table"
import { Plus, Phone, CheckCircle, XCircle, RefreshCw } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function PhoneNumbersView({ onDataChange }) {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingPhone, setEditingPhone] = useState(null)

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
      if (onDataChange) onDataChange()
    } catch (err) {
      setError("Failed to save phone number")
    }
  }

  const stats = {
    total: phoneNumbers.length,
    active: phoneNumbers.filter((p) => p.status === "active").length,
    inactive: phoneNumbers.filter((p) => p.status === "inactive").length,
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Numbers</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.active}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Inactive</p>
              <p className="text-3xl font-bold text-slate-400 mt-1">{stats.inactive}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Phone Numbers</h2>
          <p className="text-sm text-slate-500">Add and manage whitelisted numbers</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchPhoneNumbers}
            variant="outline"
            size="sm"
            className="rounded-xl"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={() => {
              setEditingPhone(null)
              setShowForm(true)
            }}
            size="sm"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Number
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <PhoneNumberForm
          phone={editingPhone}
          onSubmit={handleAddOrEdit}
          onCancel={() => {
            setShowForm(false)
            setEditingPhone(null)
          }}
        />
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
            <p className="mt-4 text-slate-500">Loading phone numbers...</p>
          </div>
        </div>
      ) : (
        <PhoneNumberTable
          phones={phoneNumbers}
          onEdit={(phone) => {
            setEditingPhone(phone)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

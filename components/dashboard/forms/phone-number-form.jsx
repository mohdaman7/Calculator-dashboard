"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, User, CheckCircle, XCircle, X } from "lucide-react"

export default function PhoneNumberForm({ phone, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    userName: "",
    status: "active",
  })

  useEffect(() => {
    if (phone) {
      setFormData({
        phoneNumber: phone.phoneNumber,
        userName: phone.userName || "",
        status: phone.status || "active",
      })
    }
  }, [phone])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {phone ? "Edit Phone Number" : "Add New Phone Number"}
            </h3>
            <p className="text-xs text-slate-500">Enter 10-digit Indian mobile number</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="h-8 w-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                setFormData((prev) => ({ ...prev, phoneNumber: value }))
              }}
              placeholder="9876543210"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-lg tracking-widest placeholder:text-slate-400 transition-all"
              required
            />
            <p className="text-xs text-slate-500">{formData.phoneNumber.length}/10 digits</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <User className="h-4 w-4 text-slate-400" />
              User Name
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
              placeholder="Enter name"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              {formData.status === "active" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-slate-400" />
              )}
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white cursor-pointer transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="px-6 rounded-xl"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
          >
            {phone ? "Update" : "Add"} Number
          </Button>
        </div>
      </form>
    </div>
  )
}

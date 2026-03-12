"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, User, CheckCircle, XCircle, X, ChevronDown, Mail } from "lucide-react"

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi", flag: "🇸🇦" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+82", country: "S.Korea", flag: "🇰🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+27", country: "S.Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
]

export default function PhoneNumberForm({ phone, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    userName: "",
    email: "",
    countryCode: "+91",
    status: "active",
  })

  useEffect(() => {
    if (phone) {
      setFormData({
        phoneNumber: phone.phoneNumber,
        userName: phone.userName || "",
        email: phone.email || "",
        countryCode: phone.countryCode || "+91",
        status: phone.status || "active",
      })
    }
  }, [phone])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.phoneNumber.length < 5) {
      alert("Please enter a valid phone number")
      return
    }
    onSubmit(formData)
  }

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-white" />
          <h3 className="font-medium text-white text-sm">
            {phone ? "Edit Number" : "Add New Number"}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="h-6 w-6 rounded-md hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-wrap items-end gap-3">
          {/* Country Code - Compact */}
          <div className="w-28">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
              Country
            </label>
            <div className="relative">
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                className="w-full h-10 pl-3 pr-7 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm cursor-pointer appearance-none"
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex-1 min-w-[180px]">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 15)
                setFormData((prev) => ({ ...prev, phoneNumber: value }))
              }}
              placeholder="Enter phone number"
              maxLength={15}
              className="w-full h-10 px-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-sm placeholder:text-slate-400"
              required
            />
          </div>

          {/* User Name */}
          <div className="flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
              Name (Optional)
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
              placeholder="User name"
              className="w-full h-10 px-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
            />
          </div>

          {/* Email Address */}
          <div className="flex-1 min-w-[180px]">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
                className="w-full h-10 pl-9 pr-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Status */}
          <div className="w-24">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
              Status
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full h-10 pl-3 pr-7 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm cursor-pointer appearance-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="h-10 px-4 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {phone ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, User, X, ChevronDown, Mail, Check, Search } from "lucide-react"
import { COUNTRIES } from "@/lib/countries"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

export default function PhoneNumberForm({ phone, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    userName: "",
    email: "",
    countryCode: "+91",
    status: "active",
  })
  const [open, setOpen] = useState(false)

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

  const selectedCountry = COUNTRIES.find(c => c.code === formData.countryCode) || COUNTRIES.find(c => c.code === "+91")

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in duration-200 mb-6">
      {/* Premium Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Phone className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">
              {phone ? "Edit Whitelisted Number" : "Add New Whitelisted Number"}
            </h3>
            <p className="text-blue-100 text-xs mt-0.5">
              {phone ? "Update existing member access" : "Grant access to a new team member"}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-all duration-200 outline-none"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Country Selector - Searchable Popover */}
          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">
              Country / Code
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full h-11 justify-between bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all px-3"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-lg leading-none">{selectedCountry?.flag}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedCountry?.code}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs truncate">({selectedCountry?.name})</span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 shadow-2xl border-slate-200 dark:border-slate-700" align="start">
                <Command>
                  <CommandInput placeholder="Search country or code..." className="h-10" />
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {COUNTRIES.map((country) => (
                        <CommandItem
                          key={`${country.name}-${country.code}`}
                          value={`${country.name} ${country.code}`}
                          onSelect={() => {
                            setFormData((prev) => ({ ...prev, countryCode: country.code }))
                            setOpen(false)
                          }}
                          className="flex items-center justify-between py-2.5 px-3 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl leading-none">{country.flag}</span>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-slate-900 dark:text-white">{country.name}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">{country.code}</span>
                            </div>
                          </div>
                          <Check
                            className={cn(
                              "h-4 w-4 text-blue-600",
                              formData.countryCode === country.code ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Phone Number Input */}
          <div className="lg:col-span-4">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-md bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-focus-within:bg-blue-600 transition-colors">
                <Phone className="h-3 w-3 text-blue-600 dark:text-blue-400 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 15)
                  setFormData((prev) => ({ ...prev, phoneNumber: value }))
                }}
                placeholder="000 000 0000"
                maxLength={15}
                className="w-full h-11 pl-11 pr-4 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base tracking-widest placeholder:text-slate-400 transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* User Name Input */}
          <div className="lg:col-span-3 md:col-span-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">
              Member Name
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-focus-within:bg-indigo-500 transition-colors">
                <User className="h-3 w-3 text-slate-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
                placeholder="e.g. John Doe"
                className="w-full h-11 pl-11 pr-4 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Status Select */}
          <div className="lg:col-span-2 md:col-span-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">
              Access Status
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full h-11 pl-4 pr-10 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm cursor-pointer appearance-none shadow-sm font-medium transition-all"
              >
                <option value="active">🟢 Active</option>
                <option value="inactive">🔴 Restricted</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Email Address - Full Width Row in grid */}
          <div className="lg:col-span-8">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">
              Email Address (Communication)
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-focus-within:bg-cyan-500 transition-colors">
                <Mail className="h-3 w-3 text-slate-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="user@organization.com"
                className="w-full h-11 pl-11 pr-4 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-4 flex items-end gap-3">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 h-11 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-[1.5] h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {phone ? "Apply Changes" : "Confirm & Whitelist"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

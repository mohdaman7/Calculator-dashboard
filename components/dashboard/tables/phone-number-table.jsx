"use client"

import { Button } from "@/components/ui/button"
import { Phone, Edit2, Trash2, CheckCircle, XCircle, Calendar, User } from "lucide-react"

export default function PhoneNumberTable({ phones, onEdit, onDelete }) {
  if (phones.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="py-12 px-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">No phone numbers yet</h3>
            <p className="text-slate-500 mt-1 text-sm">Add your first phone number to get started.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Phone Number</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Added</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {phones.map((phone) => (
              <tr 
                key={phone._id} 
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="font-mono font-medium text-slate-900 dark:text-white text-sm">
                      {phone.countryCode || "+91"} {phone.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{phone.userName || "—"}</span>
                </td>
                <td className="py-3 px-4">
                  {phone.status === "active" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-500">
                      <XCircle className="h-3 w-3" />
                      Inactive
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="text-slate-500 text-xs">
                    {new Date(phone.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 justify-center">
                    <Button
                      onClick={() => onEdit(phone)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      onClick={() => onDelete(phone._id)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
        {phones.map((phone) => (
          <div key={phone._id} className="p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Phone className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block font-mono font-medium text-slate-900 dark:text-white text-sm truncate">
                    {phone.countryCode || "+91"} {phone.phoneNumber}
                  </span>
                  <span className="text-xs text-slate-500">{phone.userName || "No name"}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  onClick={() => onEdit(phone)}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={() => onDelete(phone._id)}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {phone.status === "active" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-500">
                  <XCircle className="h-3 w-3" />
                  Inactive
                </span>
              )}
              <span className="text-slate-500 text-xs">
                {new Date(phone.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short"
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

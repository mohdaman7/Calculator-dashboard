"use client"

import { Button } from "@/components/ui/button"
import { Phone, Edit2, Trash2, CheckCircle, XCircle, Calendar, User } from "lucide-react"

export default function PhoneNumberTable({ phones, onEdit, onDelete }) {
  if (phones.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="py-16 px-6">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-6">
              <Phone className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No phone numbers yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Get started by adding your first phone number to the whitelist.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Phone Number</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">User Name</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Added On</th>
              <th className="text-center py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {phones.map((phone) => (
              <tr 
                key={phone._id} 
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white tracking-wide">
                      {phone.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700 dark:text-slate-300">{phone.userName || "—"}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {phone.status === "active" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-1 ring-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-500 ring-1 ring-slate-500/20">
                      <XCircle className="h-3.5 w-3.5" />
                      Inactive
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(phone.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={() => onEdit(phone)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete(phone._id)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
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
          <div key={phone._id} className="p-4 space-y-3">
            {/* Header with phone number and actions */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block font-mono font-semibold text-slate-900 dark:text-white tracking-wide truncate">
                    {phone.phoneNumber}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <User className="h-3.5 w-3.5" />
                    <span className="truncate">{phone.userName || "—"}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  onClick={() => onEdit(phone)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onDelete(phone._id)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Status and date row */}
            <div className="flex items-center justify-between gap-3">
              {phone.status === "active" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-1 ring-green-500/20">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-500 ring-1 ring-slate-500/20">
                  <XCircle className="h-3 w-3" />
                  Inactive
                </span>
              )}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(phone.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

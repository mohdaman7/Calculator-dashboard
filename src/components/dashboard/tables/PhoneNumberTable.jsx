"use client"

import { Button } from "@/components/ui/button"
import { Phone, Edit2, Trash2, CheckCircle, XCircle, Mail, MoreVertical } from "lucide-react"
import { COUNTRIES } from "@/lib/countries"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PhoneNumberTable({ phones, onEdit, onDelete }) {
  const getCountryFlag = (code) => {
    return COUNTRIES.find(c => c.code === code)?.flag || "🏷️"
  }

  if (phones.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="py-20 px-6">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6 shadow-inner">
              <Phone className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Whitelisting list is empty</h3>
            <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">Start by adding phone numbers to grant them access to your premium features.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 font-sans">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-4 px-6 font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em]">Contact Identity</th>
              <th className="text-left py-4 px-6 font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em]">Member Details</th>
              <th className="text-left py-4 px-6 font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em]">Communication</th>
              <th className="text-left py-4 px-6 font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em]">Access Status</th>
              <th className="text-center py-4 px-6 font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] w-28">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {phones.map((phone) => (
              <tr
                key={phone._id}
                className="group hover:bg-slate-50/80 dark:hover:bg-slate-700/20 transition-all duration-200"
              >
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-800/30 group-hover:scale-110 transition-transform">
                      <span className="text-xl leading-none">{getCountryFlag(phone.countryCode)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-base tracking-tight">
                        {phone.countryCode} {phone.phoneNumber}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{phone.userName ? "Whitelisted Member" : "Unknown Account"}</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm italic">{phone.userName || "No Alias Set"}</span>
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-col gap-1">
                    {phone.email ? (
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <div className="h-5 w-5 rounded-full bg-cyan-100/50 dark:bg-cyan-900/30 flex items-center justify-center">
                          <Mail className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="text-xs font-medium truncate max-w-[180px]">{phone.email}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded italic w-max">Email hidden</span>
                    )}
                  </div>
                </td>
                <td className="py-5 px-6">
                  {phone.status === "active" ? (
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                        <CheckCircle className="h-3.5 w-3.5" />
                        ACTIVE PASS
                      </span>
                      <span className="text-[9px] text-slate-400 pl-1">Created {new Date(phone.createdAt).toLocaleDateString()}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 ring-1 ring-rose-500/20">
                        <XCircle className="h-3.5 w-3.5" />
                        SUSPENDED
                      </span>
                      <span className="text-[9px] text-slate-400 pl-1">Disabled access</span>
                    </div>
                  )}
                </td>
                <td className="py-5 px-6">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <Button
                      onClick={() => onEdit(phone)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete(phone._id)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/40 text-slate-400 hover:text-rose-600 transition-colors"
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
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700/50 bg-slate-50/30 dark:bg-slate-900/30">
        {phones.map((phone) => (
          <div key={phone._id} className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl">
                  {getCountryFlag(phone.countryCode)}
                </div>
                <div>
                  <span className="block font-mono font-bold text-slate-900 dark:text-white text-base">
                    {phone.countryCode} {phone.phoneNumber}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{phone.userName || "No Alias Entry"}</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-xl border-slate-200 dark:border-slate-700 p-1">
                  <DropdownMenuItem onClick={() => onEdit(phone)} className="rounded-lg gap-2 cursor-pointer font-medium text-xs">
                    <Edit2 className="h-3.5 w-3.5 text-blue-500" />
                    Edit Member
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(phone._id)} className="rounded-lg gap-2 cursor-pointer font-medium text-xs text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-900/20">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete Record
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/50">
              {phone.status === "active" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/10">
                  <CheckCircle className="h-3 w-3" />
                  ACTIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 ring-1 ring-rose-500/10">
                  <XCircle className="h-3 w-3" />
                  REVOKED
                </span>
              )}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span>Whitelisted {new Date(phone.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

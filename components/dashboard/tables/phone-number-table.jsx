"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Edit2, Trash2, CheckCircle, XCircle, Calendar } from "lucide-react"

export default function PhoneNumberTable({ phones, onEdit, onDelete }) {
  if (phones.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80">
        <CardContent className="py-16">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">No phone numbers yet</p>
            <p className="text-muted-foreground mt-1">Add your first phone number to get started</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80 overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-muted/30">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          Whitelisted Phone Numbers
          <span className="ml-auto text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {phones.length} total
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Phone Number</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">User Name</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Added</th>
                <th className="text-center py-4 px-6 font-semibold text-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {phones.map((phone, index) => (
                <tr 
                  key={phone._id} 
                  className="hover:bg-muted/30 transition-colors duration-150"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-mono font-medium text-foreground">{phone.phoneNumber}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-foreground">{phone.userName || "—"}</span>
                  </td>
                  <td className="py-4 px-6">
                    {phone.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
                        <XCircle className="h-3.5 w-3.5" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(phone.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => onEdit(phone)}
                        size="sm"
                        variant="outline"
                        className="rounded-lg border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => onDelete(phone._id)}
                        size="sm"
                        variant="outline"
                        className="rounded-lg border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
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
      </CardContent>
    </Card>
  )
}

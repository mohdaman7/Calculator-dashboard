"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit2 } from "lucide-react"

export default function PhoneNumberTable({ phones, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Phone Number</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Added By</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {phones.length === 0 ? (
          <TableRow>
            <TableCell colSpan="5" className="text-center py-8 text-muted-foreground">
              No phone numbers added yet
            </TableCell>
          </TableRow>
        ) : (
          phones.map((phone) => (
            <TableRow key={phone._id}>
              <TableCell className="font-mono">{phone.phoneNumber}</TableCell>
              <TableCell>{phone.userName}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    phone.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {phone.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{phone.addedBy?.name || "Unknown"}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(phone)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(phone._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

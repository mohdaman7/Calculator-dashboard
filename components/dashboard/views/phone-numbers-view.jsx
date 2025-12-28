"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PhoneNumberForm from "../forms/phone-number-form"
import PhoneNumberTable from "../tables/phone-number-table"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function PhoneNumbersView() {
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingPhone, setEditingPhone] = useState(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null

  useEffect(() => {
    fetchPhoneNumbers()
  }, [])

  const fetchPhoneNumbers = async () => {
    try {
      const response = await fetch(`${API_URL}/phone-numbers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setPhoneNumbers(data)
    } catch (err) {
      setError("Failed to fetch phone numbers")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this phone number?")) return

    try {
      await fetch(`${API_URL}/phone-numbers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setPhoneNumbers(phoneNumbers.filter((p) => p._id !== id))
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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        })
        const newPhone = await response.json()
        setPhoneNumbers([newPhone, ...phoneNumbers])
      }
      setShowForm(false)
      setEditingPhone(null)
    } catch (err) {
      setError("Failed to save phone number")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Phone Numbers</h1>
          <p className="text-muted-foreground mt-1">Manage whitelisted phone numbers</p>
        </div>
        <Button
          onClick={() => {
            setEditingPhone(null)
            setShowForm(true)
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          + Add Phone Number
        </Button>
      </div>

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

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">{error}</div>
      )}

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
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

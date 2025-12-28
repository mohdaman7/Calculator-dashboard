"use client"

import { useState, useEffect } from "react"
import { phoneService } from "@/services/api/phoneService"
import PhoneNumberForm from "../forms/PhoneNumberForm"
import PhoneNumberTable from "../tables/PhoneNumberTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PhoneNumbersView() {
  const [phones, setPhones] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPhone, setEditingPhone] = useState(null)

  useEffect(() => {
    loadPhones()
  }, [])

  const loadPhones = async () => {
    try {
      setIsLoading(true)
      const data = await phoneService.getAllPhones()
      setPhones(data)
    } catch (error) {
      console.error("[v0] Error loading phones:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPhone = async (phoneData) => {
    try {
      await phoneService.addPhone(phoneData)
      loadPhones()
      setShowForm(false)
    } catch (error) {
      console.error("[v0] Error adding phone:", error)
    }
  }

  const handleUpdatePhone = async (id, phoneData) => {
    try {
      await phoneService.updatePhone(id, phoneData)
      loadPhones()
      setEditingPhone(null)
    } catch (error) {
      console.error("[v0] Error updating phone:", error)
    }
  }

  const handleDeletePhone = async (id) => {
    try {
      await phoneService.deletePhone(id)
      loadPhones()
    } catch (error) {
      console.error("[v0] Error deleting phone:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Phone Numbers</CardTitle>
            <CardDescription>Manage whitelisted phone numbers</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Phone Number"}</Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-6">
              <PhoneNumberForm onSubmit={handleAddPhone} onCancel={() => setShowForm(false)} />
            </div>
          )}

          {editingPhone && (
            <div className="mb-6">
              <PhoneNumberForm
                phone={editingPhone}
                onSubmit={(data) => handleUpdatePhone(editingPhone._id, data)}
                onCancel={() => setEditingPhone(null)}
              />
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <PhoneNumberTable phones={phones} onEdit={setEditingPhone} onDelete={handleDeletePhone} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

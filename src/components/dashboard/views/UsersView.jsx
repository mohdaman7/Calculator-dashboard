"use client"

import { useState, useEffect } from "react"
import { userService } from "@/services/api/userService"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function UsersView() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error("[v0] Error loading users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGrantAdmin = async (userId) => {
    try {
      await userService.grantAdminAccess(userId)
      loadUsers()
    } catch (error) {
      console.error("[v0] Error granting admin:", error)
    }
  }

  const handleRevokeAdmin = async (userId) => {
    try {
      await userService.revokeAdminAccess(userId)
      loadUsers()
    } catch (error) {
      console.error("[v0] Error revoking admin:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users & Admin Management</CardTitle>
        <CardDescription>Manage user roles and admin access</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        user.role === "admin" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {user.role === "user" ? (
                      <Button size="sm" onClick={() => handleGrantAdmin(user._id)}>
                        Grant Admin
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleRevokeAdmin(user._id)}>
                        Revoke Admin
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

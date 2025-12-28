"use client"

import { useState, useEffect } from "react"
import { activityService } from "@/services/api/activityService"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"

export default function ActivityLogsView() {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = async () => {
    try {
      setIsLoading(true)
      const data = await activityService.getActivityLogs()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("[v0] Error loading activity logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActionBadgeColor = (action) => {
    const colors = {
      ADD_PHONE: "bg-green-100 text-green-800",
      EDIT_PHONE: "bg-blue-100 text-blue-800",
      DELETE_PHONE: "bg-red-100 text-red-800",
      GRANT_ADMIN: "bg-purple-100 text-purple-800",
      REVOKE_ADMIN: "bg-orange-100 text-orange-800",
      LOGIN: "bg-gray-100 text-gray-800",
    }
    return colors[action] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
        <CardDescription>Track all admin actions and system activities</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="font-medium">{log.adminEmail}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getActionBadgeColor(log.action)}`}>
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{log.details}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        log.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(log.createdAt), "MMM dd, yyyy HH:mm")}
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

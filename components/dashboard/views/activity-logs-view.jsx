"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function ActivityLogsView() {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null

  useEffect(() => {
    fetchActivityLogs()
    const interval = setInterval(fetchActivityLogs, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch(`${API_URL}/activity-logs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setLogs(data)
    } catch (err) {
      setError("Failed to fetch activity logs")
    } finally {
      setIsLoading(false)
    }
  }

  const getActionBadgeColor = (action) => {
    const colors = {
      add: "bg-green-100 text-green-800",
      edit: "bg-blue-100 text-blue-800",
      delete: "bg-red-100 text-red-800",
      "grant-admin": "bg-purple-100 text-purple-800",
      "revoke-admin": "bg-orange-100 text-orange-800",
    }
    return colors[action] || "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-muted-foreground mt-1">Track all admin actions and changes</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">{error}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Admin</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{log.adminEmail}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(log.action)}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground capitalize">{log.targetType}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

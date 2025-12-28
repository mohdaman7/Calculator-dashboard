"use client"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"
import Dashboard from "@/components/dashboard/Dashboard"
import { useAuth } from "@/hooks/useAuth"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <Dashboard />
}

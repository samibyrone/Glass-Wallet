"use client"

import type React from "react"
import { Suspense } from "react"
import { AppShell } from "@/components/Layout/sidebar"
import { DashboardContent } from "@/components/Layout/DashboardContent"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppShell>
        <DashboardContent>{children}</DashboardContent>
      </AppShell>
    </Suspense>
  )
}

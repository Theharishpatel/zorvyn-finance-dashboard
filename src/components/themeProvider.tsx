"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Next.js 16/React 19 ke liye hum mounted check yahan se hata sakte hain
  // Agar layout.tsx mein suppressHydrationWarning hai toh ye perfect chalega
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
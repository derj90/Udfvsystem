'use client'

import { redirect } from 'next/navigation'

// Redirigir /dashboard a la página principal
export default function DashboardRedirect() {
  redirect('/')
}
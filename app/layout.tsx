import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/layout/navigation'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UDFV - Sistema de Gestión Integral',
  description: 'Sistema de gestión de proyectos para la Unidad de Desarrollo y Fortalecimiento de la Vida Estudiantil - UMCE',
  keywords: ['UDFV', 'UMCE', 'gestión de proyectos', 'educación superior'],
  authors: [{ name: 'UDFV Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CL" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <Providers>
          <div className="flex h-full">
            <Navigation />
            <main className="flex-1 overflow-auto">
              <div className="p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#374151',
                border: '1px solid #e5e7eb',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
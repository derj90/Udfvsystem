'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, useNotificaciones, useSyncStatus } from '@/app/providers'
import { 
  LayoutDashboard,
  FolderOpen,
  Users,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  RefreshCw as Sync,
  ChevronDown,
  LogOut,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Vista general del sistema'
  },
  {
    name: 'Proyectos',
    href: '/proyectos',
    icon: FolderOpen,
    description: 'Gestión de proyectos'
  },
  {
    name: 'Equipo',
    href: '/equipo',
    icon: Users,
    description: 'Gestión del equipo'
  },
  {
    name: 'Reportes',
    href: '/reportes',
    icon: BarChart3,
    description: 'Análisis y reportes'
  },
  {
    name: 'Configuración',
    href: '/configuracion',
    icon: Settings,
    description: 'Configuración del sistema'
  }
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const user = useUser()
  const { unreadCount } = useNotificaciones()
  const { syncStatus, syncWithNotion } = useSyncStatus()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">UDFV</h1>
                <p className="text-xs text-gray-500">Sistema de Gestión</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`nav-link ${
                          isActive(item.href) ? 'nav-link-active' : 'nav-link-inactive'
                        }`}
                      >
                        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Sync Status */}
              <li className="mt-auto">
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      Estado de Sincronización
                    </h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={syncWithNotion}
                      disabled={syncStatus.isActive}
                      className="h-6 w-6 p-0"
                    >
                      <Sync className={`h-3 w-3 ${syncStatus.isActive ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    {syncStatus.isActive ? (
                      <span className="text-warning-600">Sincronizando...</span>
                    ) : syncStatus.lastSync ? (
                      <span>
                        Última sync: {syncStatus.lastSync.toLocaleTimeString('es-CL')}
                      </span>
                    ) : (
                      <span>No sincronizado</span>
                    )}
                  </div>
                  
                  {syncStatus.errors.length > 0 && (
                    <div className="mt-1 text-xs text-danger-600">
                      {syncStatus.errors[0]}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        {/* Mobile menu button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">UDFV</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="danger" 
                  size="sm"
                  className="absolute -top-1 -right-1 text-xs min-w-[1.25rem] h-5"
                >
                  {unreadCount}
                </Badge>
              )}
            </button>
            
            {/* Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Navegación</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="mt-6">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`nav-link ${
                          isActive(item.href) ? 'nav-link-active' : 'nav-link-inactive'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Top bar for desktop */}
      <div className="hidden lg:block lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            
            {/* Right side */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <button className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Ver notificaciones</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="danger" 
                    size="sm"
                    className="absolute -top-1 -right-1 text-xs min-w-[1.25rem] h-5"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </button>

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-x-2 rounded-full bg-gray-50 p-1.5 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                >
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.nombre?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-2 text-sm font-semibold" aria-hidden="true">
                      {user?.nombre || 'Usuario'}
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 z-dropdown mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.nombre}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    
                    <button className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="mr-3 h-4 w-4" />
                      Mi Perfil
                    </button>
                    
                    <button className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="mr-3 h-4 w-4" />
                      Configuración
                    </button>
                    
                    <div className="border-t border-gray-100 my-1" />
                    
                    <button className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <LogOut className="mr-3 h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
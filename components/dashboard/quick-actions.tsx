'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus,
  BarChart3,
  Users,
  FileText,
  Zap,
  Clock,
  TrendingUp,
  Settings,
  Download,
  Bell
} from 'lucide-react'

interface QuickActionsProps {
  onNewProject?: () => void
  onAnalyzeProject?: () => void
  onViewReports?: () => void
  onManageTeam?: () => void
  onSyncNotion?: () => void
  onGenerateReport?: () => void
  isCoordinator?: boolean
}

export function QuickActions({
  onNewProject,
  onAnalyzeProject,
  onViewReports,
  onManageTeam,
  onSyncNotion,
  onGenerateReport,
  isCoordinator = true
}: QuickActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAction = async (actionName: string, action?: () => void) => {
    if (!action) return
    
    setIsLoading(actionName)
    try {
      await action()
    } finally {
      setIsLoading(null)
    }
  }

  // Acciones principales para coordinadores
  const primaryActions = [
    {
      id: 'new-project',
      title: 'Nuevo Proyecto',
      description: 'Crear y analizar un nuevo proyecto',
      icon: Plus,
      color: 'bg-primary-500 hover:bg-primary-600',
      action: onNewProject,
      shortcut: 'Cmd+N'
    },
    {
      id: 'analyze',
      title: 'Análisis IA',
      description: 'Optimizar recursos y detectar riesgos',
      icon: TrendingUp,
      color: 'bg-accent-500 hover:bg-accent-600',
      action: onAnalyzeProject,
      shortcut: 'Cmd+A'
    },
    {
      id: 'sync',
      title: 'Sincronizar',
      description: 'Actualizar desde Notion',
      icon: Zap,
      color: 'bg-warning-500 hover:bg-warning-600',
      action: onSyncNotion,
      urgent: true
    },
    {
      id: 'report',
      title: 'Generar Reporte',
      description: 'Reporte ejecutivo automático',
      icon: FileText,
      color: 'bg-success-500 hover:bg-success-600',
      action: onGenerateReport
    }
  ]

  // Acciones secundarias
  const secondaryActions = [
    {
      id: 'team',
      title: 'Gestionar Equipo',
      icon: Users,
      action: onManageTeam
    },
    {
      id: 'reports',
      title: 'Ver Reportes',
      icon: BarChart3,
      action: onViewReports
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      icon: Bell,
      action: () => console.log('Notifications')
    },
    {
      id: 'settings',
      title: 'Configuración',
      icon: Settings,
      action: () => console.log('Settings')
    }
  ]

  return (
    <div className="space-y-6">
      {/* Acciones principales */}
      <Card>
        <CardHeader 
          title="Acciones Rápidas" 
          subtitle="Herramientas principales para gestión de proyectos"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryActions.map(action => (
              <ActionButton
                key={action.id}
                action={action}
                isLoading={isLoading === action.id}
                onClick={() => handleAction(action.id, action.action)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acciones secundarias */}
      <Card>
        <CardHeader title="Herramientas Adicionales" />
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {secondaryActions.map(action => (
              <SecondaryActionButton
                key={action.id}
                action={action}
                onClick={() => handleAction(action.id, action.action)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accesos directos con teclado */}
      <Card variant="outlined">
        <CardContent className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Atajos de Teclado</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Nuevo proyecto</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ N</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Análisis IA</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ A</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Buscar proyecto</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ K</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ver reportes</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ R</kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ActionButtonProps {
  action: {
    id: string
    title: string
    description: string
    icon: React.ComponentType<any>
    color: string
    urgent?: boolean
    shortcut?: string
  }
  isLoading: boolean
  onClick: () => void
}

function ActionButton({ action, isLoading, onClick }: ActionButtonProps) {
  const Icon = action.icon

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative p-4 rounded-lg text-white text-left transition-all duration-200 
        ${action.color} 
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'}
        ${action.urgent ? 'ring-2 ring-warning-200 animate-pulse-slow' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <Icon className="h-6 w-6" />
        {action.shortcut && (
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
            {action.shortcut}
          </kbd>
        )}
      </div>
      
      <h3 className="font-medium text-sm mb-1">{action.title}</h3>
      <p className="text-xs opacity-90 leading-relaxed">{action.description}</p>
      
      {action.urgent && (
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-danger-500 rounded-full animate-ping" />
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  )
}

interface SecondaryActionButtonProps {
  action: {
    id: string
    title: string
    icon: React.ComponentType<any>
  }
  onClick: () => void
}

function SecondaryActionButton({ action, onClick }: SecondaryActionButtonProps) {
  const Icon = action.icon

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      <Icon className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-700">{action.title}</span>
    </button>
  )
}

// Hook para manejar atajos de teclado
export function useKeyboardShortcuts(actions: QuickActionsProps) {
  useState(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case 'n':
            event.preventDefault()
            actions.onNewProject?.()
            break
          case 'a':
            event.preventDefault()
            actions.onAnalyzeProject?.()
            break
          case 'r':
            event.preventDefault()
            actions.onViewReports?.()
            break
          case 'k':
            event.preventDefault()
            // Implementar búsqueda global
            break
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  })
}
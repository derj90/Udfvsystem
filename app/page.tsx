'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProyectos, useUser } from './providers'
import { MetricsGrid, defaultUDFVMetrics } from '@/components/dashboard/metrics-grid'
import { ProjectOverview } from '@/components/dashboard/project-overview'
import { QuickActions, useKeyboardShortcuts } from '@/components/dashboard/quick-actions'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Proyecto, MetricaDashboard } from '@/types'
import { 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const user = useUser()
  const { proyectos, loadProyectos } = useProyectos()
  const [metrics, setMetrics] = useState<MetricaDashboard[]>(defaultUDFVMetrics)
  const [isLoading, setIsLoading] = useState(true)

  // Calcular métricas en tiempo real basadas en proyectos
  useEffect(() => {
    if (proyectos.length > 0) {
      const activeProjects = proyectos.filter(p => p.estado === 'en_progreso')
      const completedProjects = proyectos.filter(p => p.estado === 'completado')
      const totalBudget = proyectos.reduce((sum, p) => sum + (p.presupuesto || 0), 0)
      const executedBudget = proyectos.reduce((sum, p) => sum + (p.presupuestoEjecutado || 0), 0)
      const riskProjects = proyectos.filter(p => p.riesgoLevel === 'alto' || p.riesgoLevel === 'medio')

      const calculatedMetrics: MetricaDashboard[] = [
        {
          label: 'Proyectos Activos',
          valor: activeProjects.length,
          tipo: 'numero',
          tendencia: 'up',
          porcentajeCambio: 8.3,
          color: 'info'
        },
        {
          label: 'Presupuesto Total',
          valor: totalBudget,
          tipo: 'moneda',
          tendencia: 'stable',
          porcentajeCambio: 2.1,
          color: 'success'
        },
        {
          label: 'Ejecución Presupuestaria',
          valor: totalBudget > 0 ? Math.round((executedBudget / totalBudget) * 100) : 0,
          tipo: 'porcentaje',
          tendencia: 'up',
          porcentajeCambio: 5.2,
          color: executedBudget / totalBudget > 0.8 ? 'warning' : 'success'
        },
        {
          label: 'Proyectos Completados',
          valor: completedProjects.length,
          tipo: 'numero',
          tendencia: 'up',
          porcentajeCambio: 12.5,
          color: 'success'
        },
        {
          label: 'Proyectos en Riesgo',
          valor: riskProjects.length,
          tipo: 'numero',
          tendencia: riskProjects.length > 2 ? 'up' : 'down',
          porcentajeCambio: 25.0,
          color: riskProjects.length > 2 ? 'danger' : 'success'
        },
        {
          label: 'Tasa de Éxito',
          valor: Math.round((completedProjects.length / proyectos.length) * 100),
          tipo: 'porcentaje',
          tendencia: 'up',
          porcentajeCambio: 7.8,
          color: 'success'
        }
      ]

      setMetrics(calculatedMetrics)
      setIsLoading(false)
    }
  }, [proyectos])

  // Configurar atajos de teclado
  useKeyboardShortcuts({
    onNewProject: () => router.push('/proyectos/nuevo'),
    onAnalyzeProject: () => console.log('Análisis IA'),
    onViewReports: () => router.push('/reportes'),
    onManageTeam: () => router.push('/equipo')
  })

  const handleProjectClick = (proyecto: Proyecto) => {
    router.push(`/proyectos/${proyecto.id}`)
  }

  const handleAnalyzeProject = (proyecto: Proyecto) => {
    console.log('Analizando proyecto:', proyecto.nombre)
    // Implementar análisis IA
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {user.nombre}
          </h1>
          <p className="mt-1 text-gray-500">
            Panel de control del Sistema UDFV - {new Date().toLocaleDateString('es-CL', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => loadProyectos()}
            className="hidden sm:flex"
          >
            Actualizar Datos
          </Button>
          <Button
            onClick={() => router.push('/proyectos/nuevo')}
          >
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Métricas Clave
        </h2>
        <MetricsGrid metrics={metrics} isLoading={isLoading} />
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proyectos (2 columnas) */}
        <div className="lg:col-span-2">
          <ProjectOverview
            proyectos={proyectos}
            isLoading={isLoading}
            onProjectClick={handleProjectClick}
            onAnalyzeProject={handleAnalyzeProject}
          />
        </div>

        {/* Sidebar derecho (1 columna) */}
        <div className="space-y-6">
          {/* Acciones rápidas */}
          <QuickActions
            onNewProject={() => router.push('/proyectos/nuevo')}
            onAnalyzeProject={() => console.log('Análisis global')}
            onViewReports={() => router.push('/reportes')}
            onManageTeam={() => router.push('/equipo')}
            onSyncNotion={() => console.log('Sync Notion')}
            onGenerateReport={() => console.log('Generar reporte')}
            isCoordinator={user.rol === 'coordinador'}
          />

          {/* Alertas y notificaciones */}
          <AlertsCard proyectos={proyectos} />

          {/* Resumen semanal */}
          <WeeklySummaryCard />
        </div>
      </div>
    </div>
  )
}

// Componente de alertas
function AlertsCard({ proyectos }: { proyectos: Proyecto[] }) {
  const riskProjects = proyectos.filter(p => p.riesgoLevel !== 'bajo')
  const upcomingDeadlines = proyectos.filter(p => {
    if (!p.fechaFin || p.estado === 'completado') return false
    const daysUntilDeadline = Math.floor(
      (new Date(p.fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    return daysUntilDeadline <= 7 && daysUntilDeadline >= 0
  })

  return (
    <Card>
      <CardHeader title="Alertas y Avisos" />
      <CardContent>
        <div className="space-y-3">
          {riskProjects.length > 0 && (
            <div className="flex items-start gap-3 p-3 bg-warning-50 rounded-lg border border-warning-200">
              <AlertTriangle className="h-5 w-5 text-warning-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning-800">
                  Proyectos en Riesgo
                </p>
                <p className="text-sm text-warning-700">
                  {riskProjects.length} proyecto{riskProjects.length > 1 ? 's' : ''} 
                  {riskProjects.length > 1 ? ' requieren' : ' requiere'} atención
                </p>
              </div>
            </div>
          )}

          {upcomingDeadlines.length > 0 && (
            <div className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary-800">
                  Entregas Próximas
                </p>
                <p className="text-sm text-primary-700">
                  {upcomingDeadlines.length} proyecto{upcomingDeadlines.length > 1 ? 's' : ''} 
                  con entrega esta semana
                </p>
              </div>
            </div>
          )}

          {riskProjects.length === 0 && upcomingDeadlines.length === 0 && (
            <div className="flex items-start gap-3 p-3 bg-success-50 rounded-lg border border-success-200">
              <CheckCircle className="h-5 w-5 text-success-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-success-800">
                  Todo en Orden
                </p>
                <p className="text-sm text-success-700">
                  No hay alertas críticas en este momento
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Componente de resumen semanal
function WeeklySummaryCard() {
  return (
    <Card>
      <CardHeader title="Resumen Semanal" />
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success-500" />
              <span className="text-sm text-gray-600">Tareas completadas</span>
            </div>
            <span className="text-sm font-medium">24</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning-500" />
              <span className="text-sm text-gray-600">Horas trabajadas</span>
            </div>
            <span className="text-sm font-medium">156h</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary-500" />
              <span className="text-sm text-gray-600">Presupuesto usado</span>
            </div>
            <span className="text-sm font-medium">$1.2M</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success-500" />
              <span className="text-sm text-gray-600">Eficiencia</span>
            </div>
            <span className="text-sm font-medium">+12%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityBadge } from '@/components/ui/badge'
import type { Proyecto } from '@/types'
import { 
  Calendar,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Eye,
  Edit,
  TrendingUp
} from 'lucide-react'

interface ProjectOverviewProps {
  proyectos: Proyecto[]
  isLoading?: boolean
  onProjectClick?: (proyecto: Proyecto) => void
  onAnalyzeProject?: (proyecto: Proyecto) => void
}

export function ProjectOverview({ 
  proyectos, 
  isLoading = false, 
  onProjectClick,
  onAnalyzeProject 
}: ProjectOverviewProps) {
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [ordenamiento, setOrdenamiento] = useState<'fecha' | 'prioridad' | 'presupuesto'>('fecha')

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Proyectos Activos" />
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Filtrar y ordenar proyectos
  const proyectosFiltrados = proyectos
    .filter(p => filtroEstado === 'todos' || p.estado === filtroEstado)
    .sort((a, b) => {
      switch (ordenamiento) {
        case 'prioridad':
          const prioridades = { 'critica': 4, 'alta': 3, 'media': 2, 'baja': 1 }
          return prioridades[b.prioridad] - prioridades[a.prioridad]
        case 'presupuesto':
          return (b.presupuesto || 0) - (a.presupuesto || 0)
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
    })

  const estadosDisponibles = [
    { value: 'todos', label: 'Todos', count: proyectos.length },
    { value: 'en_progreso', label: 'En Progreso', count: proyectos.filter(p => p.estado === 'en_progreso').length },
    { value: 'aprobado', label: 'Aprobado', count: proyectos.filter(p => p.estado === 'aprobado').length },
    { value: 'completado', label: 'Completado', count: proyectos.filter(p => p.estado === 'completado').length }
  ]

  return (
    <Card>
      <CardHeader 
        title="Proyectos Activos" 
        subtitle={`${proyectosFiltrados.length} de ${proyectos.length} proyectos`}
        action={
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/proyectos'}
          >
            Ver Todos
          </Button>
        }
      />
      
      <CardContent>
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {estadosDisponibles.map(estado => (
            <button
              key={estado.value}
              onClick={() => setFiltroEstado(estado.value)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                filtroEstado === estado.value
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {estado.label} ({estado.count})
            </button>
          ))}
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-4">
          {proyectosFiltrados.map(proyecto => (
            <ProjectCard 
              key={proyecto.id}
              proyecto={proyecto}
              onProjectClick={onProjectClick}
              onAnalyzeProject={onAnalyzeProject}
            />
          ))}
          
          {proyectosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No hay proyectos con el filtro seleccionado</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface ProjectCardProps {
  proyecto: Proyecto
  onProjectClick?: (proyecto: Proyecto) => void
  onAnalyzeProject?: (proyecto: Proyecto) => void
}

function ProjectCard({ proyecto, onProjectClick, onAnalyzeProject }: ProjectCardProps) {
  const [showActions, setShowActions] = useState(false)

  const calcularProgreso = () => {
    if (!proyecto.fechaInicio || !proyecto.fechaFin) return 0
    
    const inicio = new Date(proyecto.fechaInicio).getTime()
    const fin = new Date(proyecto.fechaFin).getTime()
    const ahora = Date.now()
    
    if (ahora < inicio) return 0
    if (ahora > fin) return 100
    
    return Math.round(((ahora - inicio) / (fin - inicio)) * 100)
  }

  const calcularPresupuestoUtilizado = () => {
    if (!proyecto.presupuesto) return 0
    return Math.round(((proyecto.presupuestoEjecutado || 0) / proyecto.presupuesto) * 100)
  }

  const getRiskLevel = () => {
    const progreso = calcularProgreso()
    const presupuestoUsado = calcularPresupuestoUtilizado()
    
    if (presupuestoUsado > 90 || (progreso > 80 && proyecto.estado !== 'completado')) {
      return 'alto'
    }
    if (presupuestoUsado > 70 || progreso > 90) {
      return 'medio'
    }
    return 'bajo'
  }

  const progreso = calcularProgreso()
  const presupuestoUsado = calcularPresupuestoUtilizado()
  const riskLevel = getRiskLevel()

  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onProjectClick?.(proyecto)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900 text-sm">{proyecto.nombre}</h4>
            <StatusBadge status={proyecto.estado} size="sm" />
            <PriorityBadge priority={proyecto.prioridad} size="sm" />
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{proyecto.descripcion}</p>
        </div>

        <div className="relative ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowActions(!showActions)
            }}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {showActions && (
            <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onProjectClick?.(proyecto)
                  setShowActions(false)
                }}
                className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="h-3 w-3" />
                Ver Detalles
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAnalyzeProject?.(proyecto)
                  setShowActions(false)
                }}
                className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <TrendingUp className="h-3 w-3" />
                Analizar IA
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Métricas del proyecto */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {proyecto.presupuesto && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Presupuesto</p>
              <p className="text-sm font-medium">
                ${proyecto.presupuesto.toLocaleString('es-CL')}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Equipo</p>
            <p className="text-sm font-medium">{proyecto.equipoIds.length} personas</p>
          </div>
        </div>

        {proyecto.fechaFin && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Entrega</p>
              <p className="text-sm font-medium">
                {new Date(proyecto.fechaFin).toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>
        )}

        {proyecto.viabilidadScore && (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Viabilidad</p>
              <p className="text-sm font-medium">{proyecto.viabilidadScore}%</p>
            </div>
          </div>
        )}
      </div>

      {/* Barras de progreso */}
      {(progreso > 0 || presupuestoUsado > 0) && (
        <div className="space-y-2">
          {progreso > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progreso temporal</span>
                <span>{progreso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    progreso < 70 ? 'bg-success-500' : 
                    progreso < 90 ? 'bg-warning-500' : 'bg-danger-500'
                  }`}
                  style={{ width: `${Math.min(progreso, 100)}%` }}
                />
              </div>
            </div>
          )}

          {proyecto.presupuesto && presupuestoUsado > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Presupuesto utilizado</span>
                <span>{presupuestoUsado}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    presupuestoUsado < 70 ? 'bg-primary-500' : 
                    presupuestoUsado < 90 ? 'bg-warning-500' : 'bg-danger-500'
                  }`}
                  style={{ width: `${Math.min(presupuestoUsado, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Indicador de riesgo */}
      {riskLevel !== 'bajo' && (
        <div className={`mt-3 flex items-center gap-2 text-xs px-2 py-1 rounded ${
          riskLevel === 'alto' ? 'bg-danger-50 text-danger-700' : 'bg-warning-50 text-warning-700'
        }`}>
          <AlertTriangle className="h-3 w-3" />
          <span>
            Proyecto en riesgo {riskLevel === 'alto' ? 'alto' : 'medio'}
          </span>
        </div>
      )}
    </div>
  )
}
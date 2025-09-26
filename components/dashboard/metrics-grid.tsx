'use client'

import { Card } from '@/components/ui/card'
import type { MetricaDashboard } from '@/types'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  DollarSign,
  Clock,
  Users,
  Target,
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react'

interface MetricsGridProps {
  metrics: MetricaDashboard[]
  isLoading?: boolean
}

export function MetricsGrid({ metrics, isLoading = false }: MetricsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} />
      ))}
    </div>
  )
}

interface MetricCardProps {
  metric: MetricaDashboard
}

function MetricCard({ metric }: MetricCardProps) {
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'moneda':
        return <DollarSign className="h-5 w-5" />
      case 'tiempo':
        return <Clock className="h-5 w-5" />
      case 'porcentaje':
        return <Target className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  const getTrendIcon = (tendencia?: string) => {
    switch (tendencia) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-danger-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: 'text-success-600',
          text: 'text-success-900'
        }
      case 'warning':
        return {
          bg: 'bg-warning-50',
          icon: 'text-warning-600',
          text: 'text-warning-900'
        }
      case 'danger':
        return {
          bg: 'bg-danger-50',
          icon: 'text-danger-600',
          text: 'text-danger-900'
        }
      case 'info':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary-600',
          text: 'text-primary-900'
        }
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          text: 'text-gray-900'
        }
    }
  }

  const formatValue = (valor: number | string, tipo: string) => {
    if (typeof valor === 'string') return valor

    switch (tipo) {
      case 'moneda':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP',
          minimumFractionDigits: 0
        }).format(valor)
      case 'porcentaje':
        return `${valor}%`
      case 'tiempo':
        return `${valor}h`
      default:
        return valor.toLocaleString('es-CL')
    }
  }

  const colors = getColorClasses(metric.color)

  return (
    <Card className="relative overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <div className={colors.icon}>
              {getIcon(metric.tipo)}
            </div>
          </div>
          
          {metric.tendencia && metric.porcentajeCambio && (
            <div className="flex items-center space-x-1">
              {getTrendIcon(metric.tendencia)}
              <span className={`text-sm font-medium ${
                metric.tendencia === 'up' ? 'text-success-600' :
                metric.tendencia === 'down' ? 'text-danger-600' :
                'text-gray-500'
              }`}>
                {Math.abs(metric.porcentajeCambio)}%
              </span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 truncate">
            {metric.label}
          </h3>
          <p className={`text-2xl font-bold mt-1 ${colors.text}`}>
            {formatValue(metric.valor, metric.tipo)}
          </p>
        </div>
      </div>

      {/* Indicador visual de estado */}
      {metric.color && (
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${
          metric.color === 'success' ? 'bg-success-500' :
          metric.color === 'warning' ? 'bg-warning-500' :
          metric.color === 'danger' ? 'bg-danger-500' :
          metric.color === 'info' ? 'bg-primary-500' :
          'bg-gray-300'
        }`} />
      )}
    </Card>
  )
}

// Métricas predefinidas comunes para UDFV
export const defaultUDFVMetrics: MetricaDashboard[] = [
  {
    label: 'Proyectos Activos',
    valor: 12,
    tipo: 'numero',
    tendencia: 'up',
    porcentajeCambio: 8.3,
    color: 'info'
  },
  {
    label: 'Presupuesto Ejecutado',
    valor: 2450000,
    tipo: 'moneda',
    tendencia: 'stable',
    porcentajeCambio: 2.1,
    color: 'success'
  },
  {
    label: 'Eficiencia del Equipo',
    valor: 87,
    tipo: 'porcentaje',
    tendencia: 'up',
    porcentajeCambio: 5.2,
    color: 'success'
  },
  {
    label: 'Horas Planificadas',
    valor: 1248,
    tipo: 'tiempo',
    tendencia: 'down',
    porcentajeCambio: 3.7,
    color: 'warning'
  },
  {
    label: 'Tareas Completadas',
    valor: 156,
    tipo: 'numero',
    tendencia: 'up',
    porcentajeCambio: 12.5,
    color: 'success'
  },
  {
    label: 'Proyectos en Riesgo',
    valor: 3,
    tipo: 'numero',
    tendencia: 'down',
    porcentajeCambio: 25.0,
    color: 'danger'
  },
  {
    label: 'ROI Promedio',
    valor: 94,
    tipo: 'porcentaje',
    tendencia: 'up',
    porcentajeCambio: 7.8,
    color: 'success'
  },
  {
    label: 'Tiempo Prom. Entrega',
    valor: 168,
    tipo: 'tiempo',
    tendencia: 'stable',
    porcentajeCambio: 1.2,
    color: 'info'
  }
]
import { forwardRef, type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    
    const baseClasses = [
      'inline-flex items-center font-medium rounded-full',
      'ring-1 ring-inset'
    ]

    const variants = {
      default: [
        'bg-gray-50 text-gray-600 ring-gray-500/10'
      ],
      success: [
        'bg-success-50 text-success-700 ring-success-600/20'
      ],
      warning: [
        'bg-warning-50 text-warning-800 ring-warning-600/20'
      ],
      danger: [
        'bg-danger-50 text-danger-700 ring-danger-600/10'
      ],
      info: [
        'bg-primary-50 text-primary-700 ring-primary-700/10'
      ]
    }

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-sm'
    }

    return (
      <span
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Componente específico para estados de proyecto
interface StatusBadgeProps {
  status: 'propuesta' | 'aprobado' | 'en_progreso' | 'completado' | 'cancelado' | 'pendiente' | 'bloqueada'
  size?: 'sm' | 'md' | 'lg'
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const statusConfig = {
    propuesta: { variant: 'default' as const, label: 'Propuesta' },
    aprobado: { variant: 'info' as const, label: 'Aprobado' },
    en_progreso: { variant: 'warning' as const, label: 'En Progreso' },
    completado: { variant: 'success' as const, label: 'Completado' },
    cancelado: { variant: 'danger' as const, label: 'Cancelado' },
    pendiente: { variant: 'default' as const, label: 'Pendiente' },
    bloqueada: { variant: 'danger' as const, label: 'Bloqueada' }
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  )
}

// Componente para prioridades
interface PriorityBadgeProps {
  priority: 'baja' | 'media' | 'alta' | 'critica'
  size?: 'sm' | 'md' | 'lg'
}

const PriorityBadge = ({ priority, size = 'md' }: PriorityBadgeProps) => {
  const priorityConfig = {
    baja: { variant: 'default' as const, label: 'Baja' },
    media: { variant: 'info' as const, label: 'Media' },
    alta: { variant: 'warning' as const, label: 'Alta' },
    critica: { variant: 'danger' as const, label: 'Crítica' }
  }

  const config = priorityConfig[priority]

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  )
}

export { Badge, StatusBadge, PriorityBadge }
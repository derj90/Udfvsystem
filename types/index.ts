// Tipos principales del sistema UDFV

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'coordinador' | 'miembro' | 'autoridad'
  activo: boolean
  costoHora?: number
  especialidades?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  estado: 'propuesta' | 'aprobado' | 'en_progreso' | 'completado' | 'cancelado'
  prioridad: 'baja' | 'media' | 'alta' | 'critica'
  fechaInicio?: Date
  fechaFin?: Date
  presupuesto?: number
  presupuestoEjecutado?: number
  responsableId: string
  equipoIds: string[]
  notionId?: string
  viabilidadScore?: number
  riesgoLevel?: 'bajo' | 'medio' | 'alto'
  recomendaciones?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Actividad {
  id: string
  proyectoId: string
  nombre: string
  descripcion?: string
  estado: 'pendiente' | 'en_progreso' | 'completada' | 'bloqueada'
  horasEstimadas: number
  horasReales?: number
  fechaInicio?: Date
  fechaFin?: Date
  asignadoId: string
  notionId?: string
  createdAt: Date
  updatedAt: Date
}

export interface AnalisisIA {
  id: string
  proyectoId: string
  tipo: 'viabilidad' | 'optimizacion' | 'riesgo' | 'prediccion'
  score: number
  insights: string[]
  recomendaciones: string[]
  confianza: number
  ejecutadoAt: Date
}

export interface Reporte {
  id: string
  titulo: string
  tipo: 'ejecutivo' | 'financiero' | 'rendimiento' | 'roi'
  contenido: any // JSON structure
  generadoPor: string
  createdAt: Date
}

export interface MetricaDashboard {
  label: string
  valor: number | string
  tendencia?: 'up' | 'down' | 'stable'
  porcentajeCambio?: number
  tipo: 'numero' | 'porcentaje' | 'moneda' | 'tiempo'
  color?: 'success' | 'warning' | 'danger' | 'info'
}

export interface AlertaNotificacion {
  id: string
  titulo: string
  mensaje: string
  tipo: 'info' | 'warning' | 'error' | 'success'
  prioridad: 'baja' | 'media' | 'alta'
  leida: boolean
  usuarioId: string
  proyectoId?: string
  createdAt: Date
}

export interface ConfiguracionNotion {
  databaseId: string
  token: string
  ultimaSync: Date
  webhookUrl?: string
  campos: {
    proyectos: Record<string, string>
    actividades: Record<string, string>
  }
}

export interface EstadoSincronizacion {
  enProgreso: boolean
  ultimaSync: Date
  errores?: string[]
  registrosProcesados: number
}

// Tipos para formularios y validación
export interface NuevoProyectoForm {
  nombre: string
  descripcion: string
  responsableId: string
  presupuesto?: number
  fechaInicio?: Date
  fechaFin?: Date
  prioridad: Proyecto['prioridad']
}

export interface AnalisisProyectoResponse {
  viabilidadScore: number
  riesgoLevel: 'bajo' | 'medio' | 'alto'
  recomendaciones: string[]
  timelineEstimado: {
    minSemanas: number
    maxSemanas: number
  }
  recursosRecomendados: {
    equipoSize: number
    especialidadesRequeridas: string[]
    presupuestoEstimado: number
  }
  factoresRiesgo: string[]
}

export interface OptimizacionRecursos {
  proyectoId: string
  recomendaciones: {
    reasignaciones: {
      actividadId: string
      deUsuario: string
      hacieusuario: string
      razon: string
    }[]
    ajustesTimeline: {
      actividadId: string
      nuevaFechaFin: Date
      razon: string
    }[]
  }
  impactoEstimado: {
    ahorroCostos: number
    reduccionTiempo: number
    mejoraEficiencia: number
  }
}
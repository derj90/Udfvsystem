'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { Usuario, Proyecto, AlertaNotificacion } from '@/types'

// Estado global de la aplicación
interface AppState {
  user: Usuario | null
  proyectos: Proyecto[]
  notificaciones: AlertaNotificacion[]
  isLoading: boolean
  error: string | null
  syncStatus: {
    isActive: boolean
    lastSync: Date | null
    errors: string[]
  }
}

// Acciones para el reducer
type AppAction = 
  | { type: 'SET_USER'; payload: Usuario | null }
  | { type: 'SET_PROYECTOS'; payload: Proyecto[] }
  | { type: 'ADD_PROYECTO'; payload: Proyecto }
  | { type: 'UPDATE_PROYECTO'; payload: { id: string; updates: Partial<Proyecto> } }
  | { type: 'SET_NOTIFICACIONES'; payload: AlertaNotificacion[] }
  | { type: 'ADD_NOTIFICACION'; payload: AlertaNotificacion }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SYNC_STATUS'; payload: Partial<AppState['syncStatus']> }

// Estado inicial
const initialState: AppState = {
  user: null,
  proyectos: [],
  notificaciones: [],
  isLoading: false,
  error: null,
  syncStatus: {
    isActive: false,
    lastSync: null,
    errors: []
  }
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'SET_PROYECTOS':
      return { ...state, proyectos: action.payload }
    
    case 'ADD_PROYECTO':
      return { 
        ...state, 
        proyectos: [action.payload, ...state.proyectos] 
      }
    
    case 'UPDATE_PROYECTO':
      return {
        ...state,
        proyectos: state.proyectos.map(p => 
          p.id === action.payload.id 
            ? { ...p, ...action.payload.updates }
            : p
        )
      }
    
    case 'SET_NOTIFICACIONES':
      return { ...state, notificaciones: action.payload }
    
    case 'ADD_NOTIFICACION':
      return { 
        ...state, 
        notificaciones: [action.payload, ...state.notificaciones] 
      }
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notificaciones: state.notificaciones.map(n =>
          n.id === action.payload ? { ...n, leida: true } : n
        )
      }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'SET_SYNC_STATUS':
      return { 
        ...state, 
        syncStatus: { ...state.syncStatus, ...action.payload } 
      }
    
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
  actions: {
    loadUser: () => Promise<void>
    loadProyectos: () => Promise<void>
    createProyecto: (data: any) => Promise<void>
    syncWithNotion: () => Promise<void>
    markNotificationRead: (id: string) => void
  }
} | undefined>(undefined)

// Provider component
export function Providers({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Acciones del contexto
  const actions = {
    loadUser: async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        
        // Simular carga de usuario (en producción sería de la API)
        const mockUser: Usuario = {
          id: '1',
          nombre: 'Coordinador UDFV',
          email: 'coordinador@umce.cl',
          rol: 'coordinador',
          activo: true,
          costoHora: 25000,
          especialidades: ['Gestión de Proyectos', 'Análisis de Datos'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        dispatch({ type: 'SET_USER', payload: mockUser })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error cargando usuario' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    loadProyectos: async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        
        // Simular carga de proyectos (en producción sería de la API)
        const mockProyectos: Proyecto[] = [
          {
            id: '1',
            nombre: 'Sistema de Tutorías Académicas',
            descripcion: 'Implementación de plataforma digital para gestión de tutorías entre estudiantes',
            estado: 'en_progreso',
            prioridad: 'alta',
            fechaInicio: new Date('2024-01-15'),
            fechaFin: new Date('2024-06-30'),
            presupuesto: 5000000,
            presupuestoEjecutado: 2100000,
            responsableId: '1',
            equipoIds: ['1', '2', '3'],
            viabilidadScore: 85,
            riesgoLevel: 'bajo',
            recomendaciones: ['Definir métricas de éxito', 'Capacitar tutores'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            nombre: 'App Móvil Bienestar Estudiantil',
            descripcion: 'Desarrollo de aplicación móvil para servicios de bienestar estudiantil',
            estado: 'aprobado',
            prioridad: 'media',
            fechaInicio: new Date('2024-03-01'),
            fechaFin: new Date('2024-09-15'),
            presupuesto: 8000000,
            presupuestoEjecutado: 0,
            responsableId: '1',
            equipoIds: ['1', '4'],
            viabilidadScore: 92,
            riesgoLevel: 'medio',
            recomendaciones: ['Validar con usuarios finales', 'Considerar accesibilidad'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '3',
            nombre: 'Centro de Recursos Digitales',
            descripcion: 'Creación de centro virtual con recursos académicos y materiales de apoyo',
            estado: 'completado',
            prioridad: 'baja',
            fechaInicio: new Date('2023-08-01'),
            fechaFin: new Date('2023-12-20'),
            presupuesto: 3500000,
            presupuestoEjecutado: 3200000,
            responsableId: '1',
            equipoIds: ['2', '3'],
            viabilidadScore: 95,
            riesgoLevel: 'bajo',
            recomendaciones: [],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
        
        dispatch({ type: 'SET_PROYECTOS', payload: mockProyectos })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error cargando proyectos' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    createProyecto: async (data: any) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        
        // Simular creación de proyecto
        const newProyecto: Proyecto = {
          id: String(Date.now()),
          ...data,
          estado: 'propuesta',
          equipoIds: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        dispatch({ type: 'ADD_PROYECTO', payload: newProyecto })
        
        // Agregar notificación
        const notification: AlertaNotificacion = {
          id: String(Date.now()),
          titulo: 'Nuevo Proyecto Creado',
          mensaje: `El proyecto "${data.nombre}" ha sido creado exitosamente`,
          tipo: 'success',
          prioridad: 'media',
          leida: false,
          usuarioId: '1',
          proyectoId: newProyecto.id,
          createdAt: new Date()
        }
        
        dispatch({ type: 'ADD_NOTIFICACION', payload: notification })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error creando proyecto' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    syncWithNotion: async () => {
      try {
        dispatch({ type: 'SET_SYNC_STATUS', payload: { isActive: true } })
        
        // Simular sincronización
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        dispatch({ 
          type: 'SET_SYNC_STATUS', 
          payload: { 
            isActive: false, 
            lastSync: new Date(),
            errors: []
          } 
        })
        
        // Notificación de éxito
        const notification: AlertaNotificacion = {
          id: String(Date.now()),
          titulo: 'Sincronización Completada',
          mensaje: 'Los datos se han sincronizado correctamente con Notion',
          tipo: 'success',
          prioridad: 'baja',
          leida: false,
          usuarioId: '1',
          createdAt: new Date()
        }
        
        dispatch({ type: 'ADD_NOTIFICACION', payload: notification })
      } catch (error) {
        dispatch({ 
          type: 'SET_SYNC_STATUS', 
          payload: { 
            isActive: false,
            errors: ['Error en la sincronización con Notion']
          } 
        })
      }
    },

    markNotificationRead: (id: string) => {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id })
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    actions.loadUser()
    actions.loadProyectos()
  }, [])

  // Sincronización automática cada 15 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.syncStatus.isActive) {
        actions.syncWithNotion()
      }
    }, 15 * 60 * 1000) // 15 minutos

    return () => clearInterval(interval)
  }, [state.syncStatus.isActive])

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook para usar el contexto
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Providers component')
  }
  return context
}

// Hooks específicos para diferentes partes del estado
export function useUser() {
  const { state } = useApp()
  return state.user
}

export function useProyectos() {
  const { state, actions } = useApp()
  return {
    proyectos: state.proyectos,
    loadProyectos: actions.loadProyectos,
    createProyecto: actions.createProyecto
  }
}

export function useNotificaciones() {
  const { state, actions } = useApp()
  return {
    notificaciones: state.notificaciones,
    unreadCount: state.notificaciones.filter(n => !n.leida).length,
    markAsRead: actions.markNotificationRead
  }
}

export function useSyncStatus() {
  const { state, actions } = useApp()
  return {
    syncStatus: state.syncStatus,
    syncWithNotion: actions.syncWithNotion
  }
}
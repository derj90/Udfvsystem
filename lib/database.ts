import { sql } from '@vercel/postgres'
import type { Usuario, Proyecto, Actividad } from '@/types'

export class DatabaseService {
  // Métodos básicos para pruebas locales
  // En producción se conectará a Vercel Postgres

  static async getUsuarios(): Promise<Usuario[]> {
    try {
      // Para desarrollo local, devolver datos mock
      return [
        {
          id: '1',
          nombre: 'Coordinador UDFV',
          email: 'coordinador@umce.cl',
          rol: 'coordinador',
          activo: true,
          costoHora: 15000,
          especialidades: ['gestión', 'análisis'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2', 
          nombre: 'Desarrollador Senior',
          email: 'dev1@umce.cl',
          rol: 'miembro',
          activo: true,
          costoHora: 12000,
          especialidades: ['desarrollo', 'frontend'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    } catch (error) {
      console.error('Error obteniendo usuarios:', error)
      return []
    }
  }

  static async getProyectos(): Promise<Proyecto[]> {
    try {
      // Datos mock para desarrollo
      return [
        {
          id: '1',
          nombre: 'Modernización Plataforma LMS',
          descripcion: 'Actualización del sistema de gestión de aprendizaje',
          estado: 'en_progreso',
          prioridad: 'alta',
          fechaInicio: new Date('2024-01-15'),
          fechaFin: new Date('2024-03-30'),
          presupuesto: 5000000,
          presupuestoEjecutado: 2500000,
          responsableId: '1',
          equipoIds: ['1', '2'],
          viabilidadScore: 85,
          riesgoLevel: 'bajo',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          nombre: 'Sistema de Métricas UDFV',
          descripcion: 'Implementación del sistema de análisis de métricas',
          estado: 'propuesta',
          prioridad: 'media',
          presupuesto: 3000000,
          responsableId: '2',
          equipoIds: ['2'],
          viabilidadScore: 78,
          riesgoLevel: 'medio',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    } catch (error) {
      console.error('Error obteniendo proyectos:', error)
      return []
    }
  }

  static async getActividades(): Promise<Actividad[]> {
    try {
      return [
        {
          id: '1',
          proyectoId: '1',
          nombre: 'Análisis de requerimientos',
          descripcion: 'Definir alcance y especificaciones técnicas',
          estado: 'completada',
          horasEstimadas: 40,
          horasReales: 35,
          fechaInicio: new Date('2024-01-15'),
          fechaFin: new Date('2024-01-22'),
          asignadoId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          proyectoId: '1',
          nombre: 'Desarrollo del frontend',
          descripcion: 'Implementación de la interfaz de usuario',
          estado: 'en_progreso',
          horasEstimadas: 80,
          horasReales: 45,
          fechaInicio: new Date('2024-01-23'),
          asignadoId: '2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    } catch (error) {
      console.error('Error obteniendo actividades:', error)
      return []
    }
  }

  static async getActividadesByProyecto(proyectoId: string): Promise<Actividad[]> {
    const actividades = await this.getActividades()
    return actividades.filter(a => a.proyectoId === proyectoId)
  }

  static async createUsuario(data: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Usuario> {
    // Mock implementation para desarrollo
    const newUser: Usuario = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return newUser
  }

  static async createProyecto(data: Omit<Proyecto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Proyecto> {
    // Mock implementation para desarrollo
    const newProject: Proyecto = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return newProject
  }

  static async createActividad(data: Omit<Actividad, 'id' | 'createdAt' | 'updatedAt'>): Promise<Actividad> {
    // Mock implementation para desarrollo
    const newActivity: Actividad = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return newActivity
  }

  // Métodos para inicialización de tablas (solo en producción con Postgres)
  static async initializeTables() {
    try {
      // Este método se ejecutará solo en producción con Vercel Postgres
      if (process.env.POSTGRES_URL) {
        await sql`
          CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            rol VARCHAR(50) NOT NULL,
            activo BOOLEAN DEFAULT true,
            costo_hora INTEGER,
            especialidades JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `

        await sql`
          CREATE TABLE IF NOT EXISTS proyectos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            estado VARCHAR(50) NOT NULL,
            prioridad VARCHAR(50) NOT NULL,
            fecha_inicio TIMESTAMP,
            fecha_fin TIMESTAMP,
            presupuesto INTEGER,
            presupuesto_ejecutado INTEGER,
            responsable_id INTEGER REFERENCES usuarios(id),
            equipo_ids JSONB,
            notion_id VARCHAR(255),
            viabilidad_score INTEGER,
            riesgo_level VARCHAR(50),
            recomendaciones JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `

        await sql`
          CREATE TABLE IF NOT EXISTS actividades (
            id SERIAL PRIMARY KEY,
            proyecto_id INTEGER REFERENCES proyectos(id),
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            estado VARCHAR(50) NOT NULL,
            horas_estimadas INTEGER NOT NULL,
            horas_reales INTEGER,
            fecha_inicio TIMESTAMP,
            fecha_fin TIMESTAMP,
            asignado_id INTEGER REFERENCES usuarios(id),
            notion_id VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `

        console.log('✅ Tablas inicializadas correctamente')
      }
    } catch (error) {
      console.error('Error inicializando tablas:', error)
    }
  }
}
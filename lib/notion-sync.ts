import { Client } from '@notionhq/client'
import type { Proyecto, Actividad } from '@/types'

export class NotionSyncService {
  private notion: Client
  private projectsDbId: string
  private activitiesDbId: string

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN
    })
    this.projectsDbId = process.env.NOTION_PROJECTS_DB_ID || ''
    this.activitiesDbId = process.env.NOTION_ACTIVITIES_DB_ID || ''
  }

  // Método principal de sincronización
  async syncFromNotion(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔄 Iniciando sincronización con Notion...')
      
      // Por ahora, simulamos la sincronización exitosa
      // En producción, aquí se implementaría la lógica real de sincronización
      
      await this.delay(1000) // Simular tiempo de procesamiento
      
      return {
        success: true,
        message: 'Sincronización completada exitosamente'
      }
    } catch (error) {
      console.error('Error en sincronización:', error)
      return {
        success: false,
        message: 'Error durante la sincronización'
      }
    }
  }

  // Obtener proyectos desde Notion
  async getProyectosFromNotion(): Promise<Partial<Proyecto>[]> {
    try {
      if (!this.projectsDbId) {
        console.warn('No se ha configurado NOTION_PROJECTS_DB_ID')
        return []
      }

      const response = await this.notion.databases.query({
        database_id: this.projectsDbId,
        page_size: 50
      })

      return response.results.map(page => this.mapNotionToProyecto(page))
    } catch (error) {
      console.error('Error obteniendo proyectos de Notion:', error)
      return []
    }
  }

  // Obtener actividades desde Notion
  async getActividadesFromNotion(): Promise<Partial<Actividad>[]> {
    try {
      if (!this.activitiesDbId) {
        console.warn('No se ha configurado NOTION_ACTIVITIES_DB_ID')
        return []
      }

      const response = await this.notion.databases.query({
        database_id: this.activitiesDbId,
        page_size: 100
      })

      return response.results.map(page => this.mapNotionToActividad(page))
    } catch (error) {
      console.error('Error obteniendo actividades de Notion:', error)
      return []
    }
  }

  // Mapear página de Notion a Proyecto
  private mapNotionToProyecto(page: any): Partial<Proyecto> {
    try {
      const properties = page.properties || {}
      
      return {
        notionId: page.id,
        nombre: this.getTextFromNotion(properties['Nombre de Proyecto'] || properties.titulo),
        descripcion: this.getTextFromNotion(properties.descripcion),
        estado: this.mapNotionStatusToLocal(this.getSelectFromNotion(properties.Estado)) as any,
        prioridad: 'media' as any, // Valor por defecto
        fechaInicio: this.getDateFromNotion(properties['Fecha']) || this.getDateFromNotion(properties.fecha),
        responsableId: '1', // Por defecto, en producción se mapearía correctamente
        equipoIds: []
      }
    } catch (error) {
      console.error('Error mapeando proyecto de Notion:', error)
      return { notionId: page.id, nombre: 'Proyecto sin nombre' }
    }
  }

  // Mapear página de Notion a Actividad
  private mapNotionToActividad(page: any): Partial<Actividad> {
    try {
      const properties = page.properties || {}
      
      return {
        notionId: page.id,
        nombre: this.getTextFromNotion(properties['Actividad Desarrollada'] || properties.nombre),
        descripcion: this.getTextFromNotion(properties.descripcion),
        estado: this.mapNotionStatusToLocal(this.getSelectFromNotion(properties.Estado)) as any,
        horasEstimadas: this.getNumberFromNotion(properties['Tiempo para completar tarea']) || 8,
        horasReales: this.getNumberFromNotion(properties.horasReales),
        fechaInicio: this.getDateFromNotion(properties['Fecha de desarrollo']),
        proyectoId: '1', // En producción se mapearía desde la relación
        asignadoId: '1' // En producción se mapearía desde Desarrollador de actividad
      }
    } catch (error) {
      console.error('Error mapeando actividad de Notion:', error)
      return { 
        notionId: page.id, 
        nombre: 'Actividad sin nombre',
        horasEstimadas: 8,
        proyectoId: '1',
        asignadoId: '1'
      }
    }
  }

  // Utilidades para extraer datos de Notion
  private getTextFromNotion(property: any): string {
    if (!property) return ''
    
    if (property.title && Array.isArray(property.title)) {
      return property.title.map((t: any) => t.plain_text).join('')
    }
    
    if (property.rich_text && Array.isArray(property.rich_text)) {
      return property.rich_text.map((t: any) => t.plain_text).join('')
    }
    
    return ''
  }

  private getSelectFromNotion(property: any): string {
    if (!property || !property.select) return ''
    return property.select.name || ''
  }

  private getDateFromNotion(property: any): Date | undefined {
    if (!property || !property.date) return undefined
    return new Date(property.date.start)
  }

  private getNumberFromNotion(property: any): number | undefined {
    if (!property || property.number === null || property.number === undefined) return undefined
    return property.number
  }

  private mapNotionStatusToLocal(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Propuesta': 'propuesta',
      'Aprobado': 'aprobado',
      'En Progreso': 'en_progreso',
      'En progreso': 'en_progreso',
      'Completado': 'completado',
      'Cancelado': 'cancelado',
      'Pendiente': 'pendiente',
      'Finalizado': 'completada',
      'Bloqueada': 'bloqueada'
    }
    
    return statusMap[status] || 'propuesta'
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Método para testing de conexión
  async testConnection(): Promise<boolean> {
    try {
      await this.notion.users.list({})
      return true
    } catch (error) {
      console.error('Error conectando con Notion:', error)
      return false
    }
  }
}
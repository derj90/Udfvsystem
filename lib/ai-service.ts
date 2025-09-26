import type { Proyecto, Usuario, Actividad } from '@/types'

export class AIService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || ''
  }

  /**
   * Analiza la viabilidad de un proyecto usando IA
   */
  async analizarViabilidadProyecto(proyecto: Proyecto) {
    try {
      // Por ahora simulamos el análisis IA
      // En producción, aquí iría la llamada real a Claude API
      
      const complejidadScore = this.calcularComplejidad(proyecto)
      const recursosScore = this.calcularRecursosDisponibles(proyecto)
      const tiempoScore = this.calcularTiempoEstimado(proyecto)
      
      const scoreTotal = Math.round((complejidadScore + recursosScore + tiempoScore) / 3)
      
      return {
        viabilidadScore: scoreTotal,
        confianza: 0.85,
        factores: [
          {
            nombre: 'Complejidad Técnica',
            score: complejidadScore,
            descripcion: this.getComplejidadDescripcion(complejidadScore)
          },
          {
            nombre: 'Recursos Disponibles', 
            score: recursosScore,
            descripcion: this.getRecursosDescripcion(recursosScore)
          },
          {
            nombre: 'Tiempo Estimado',
            score: tiempoScore,
            descripcion: this.getTiempoDescripcion(tiempoScore)
          }
        ],
        recomendaciones: this.generarRecomendaciones(scoreTotal, proyecto),
        riesgos: this.identificarRiesgos(scoreTotal, proyecto),
        siguientesPasos: this.sugerirSiguientesPasos(proyecto)
      }
    } catch (error) {
      console.error('Error en análisis de viabilidad:', error)
      throw new Error('Error al analizar la viabilidad del proyecto')
    }
  }

  /**
   * Optimiza la asignación de recursos para un proyecto
   */
  async optimizarRecursos(
    proyecto: Proyecto,
    actividades: Actividad[],
    equipo: Usuario[]
  ) {
    try {
      const asignacionOptima = equipo.map(usuario => {
        const actividadesAsignadas = actividades.filter(a => a.asignadoId === usuario.id)
        const cargaActual = actividadesAsignadas.length
        const capacidadMaxima = 5 // Simulado
        
        return {
          usuario: usuario.nombre,
          cargaActual,
          capacidadMaxima,
          utilizacion: Math.round((cargaActual / capacidadMaxima) * 100),
          recomendacion: this.getRecomendacionCarga(cargaActual, capacidadMaxima)
        }
      })

      return {
        asignacionOptima,
        alertas: asignacionOptima.filter(a => a.utilizacion > 80),
        sugerencias: this.generarSugerenciasOptimizacion(asignacionOptima)
      }
    } catch (error) {
      console.error('Error en optimización de recursos:', error)
      throw new Error('Error al optimizar recursos')
    }
  }

  /**
   * Predice riesgos potenciales
   */
  async predecirRiesgos(proyectos: Proyecto[], actividades: Actividad[]) {
    try {
      const riesgos = [
        {
          tipo: 'sobrecarga',
          probabilidad: 0.3,
          impacto: 'alto',
          descripcion: 'Posible sobrecarga del equipo en las próximas semanas'
        },
        {
          tipo: 'delay',
          probabilidad: 0.2,
          impacto: 'medio',
          descripcion: 'Riesgo de retraso en entregas por dependencias'
        }
      ]

      return {
        riesgosDetectados: riesgos,
        scoreRiesgoGeneral: 35, // 0-100
        accionesPreventivas: [
          'Redistribuir tareas del proyecto X',
          'Revisar dependencias críticas',
          'Considerar recursos adicionales'
        ]
      }
    } catch (error) {
      console.error('Error en predicción de riesgos:', error)
      throw new Error('Error al predecir riesgos')
    }
  }

  // Métodos auxiliares privados

  private calcularComplejidad(proyecto: Proyecto): number {
    // Lógica simplificada de cálculo de complejidad
    const baseScore = 70
    if (proyecto.descripcion?.toLowerCase().includes('complejo')) return baseScore - 20
    if (proyecto.descripcion?.toLowerCase().includes('simple')) return baseScore + 20
    return baseScore
  }

  private calcularRecursosDisponibles(proyecto: Proyecto): number {
    // Simulación de disponibilidad de recursos
    return Math.floor(Math.random() * 30) + 70 // 70-100
  }

  private calcularTiempoEstimado(proyecto: Proyecto): number {
    // Simulación de score de tiempo
    return Math.floor(Math.random() * 20) + 75 // 75-95
  }

  private getComplejidadDescripcion(score: number): string {
    if (score >= 80) return 'Complejidad baja, proyecto manejable'
    if (score >= 60) return 'Complejidad media, requiere planificación'
    return 'Alta complejidad, requiere experiencia especializada'
  }

  private getRecursosDescripcion(score: number): string {
    if (score >= 80) return 'Recursos suficientes disponibles'
    if (score >= 60) return 'Recursos limitados, optimización necesaria'
    return 'Recursos insuficientes, requiere escalamiento'
  }

  private getTiempoDescripcion(score: number): string {
    if (score >= 80) return 'Tiempo realista y bien estimado'
    if (score >= 60) return 'Tiempo ajustado, posibles variaciones'
    return 'Tiempo insuficiente, revisar alcance'
  }

  private generarRecomendaciones(score: number, proyecto: Proyecto): string[] {
    const recomendaciones = []
    
    if (score >= 80) {
      recomendaciones.push('Proyecto con alta probabilidad de éxito')
      recomendaciones.push('Proceder con la implementación según lo planificado')
    } else if (score >= 60) {
      recomendaciones.push('Proyecto viable con ajustes menores')
      recomendaciones.push('Revisar asignación de recursos')
    } else {
      recomendaciones.push('Proyecto requiere replanteo significativo')
      recomendaciones.push('Considerar dividir en fases más pequeñas')
    }

    return recomendaciones
  }

  private identificarRiesgos(score: number, proyecto: Proyecto): string[] {
    const riesgos = []
    
    if (score < 70) {
      riesgos.push('Alto riesgo de retraso en entregas')
      riesgos.push('Posible necesidad de recursos adicionales')
    }
    
    if (score < 50) {
      riesgos.push('Riesgo crítico de fracaso del proyecto')
    }

    return riesgos
  }

  private sugerirSiguientesPasos(proyecto: Proyecto): string[] {
    return [
      'Validar requerimientos con stakeholders',
      'Definir hitos y entregables específicos',
      'Asignar responsables por área',
      'Establecer reuniones de seguimiento semanales'
    ]
  }

  private getRecomendacionCarga(actual: number, maxima: number): string {
    const porcentaje = (actual / maxima) * 100
    
    if (porcentaje > 90) return 'Sobrecargado - redistribuir tareas'
    if (porcentaje > 70) return 'Carga alta - monitorear de cerca'
    if (porcentaje > 50) return 'Carga normal - óptimo'
    return 'Capacidad disponible - puede asumir más tareas'
  }

  private generarSugerenciasOptimizacion(asignacion: any[]): string[] {
    const sugerencias = []
    
    const sobrecargados = asignacion.filter(a => a.utilizacion > 80)
    const disponibles = asignacion.filter(a => a.utilizacion < 50)
    
    if (sobrecargados.length > 0 && disponibles.length > 0) {
      sugerencias.push(`Redistribuir tareas de ${sobrecargados[0].usuario} hacia ${disponibles[0].usuario}`)
    }
    
    if (sobrecargados.length > 2) {
      sugerencias.push('Considerar contratación temporal o retraso de proyectos no críticos')
    }
    
    return sugerencias
  }
}
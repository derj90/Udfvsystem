import { NextRequest, NextResponse } from 'next/server'
import type { Proyecto } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proyecto }: { proyecto: Proyecto } = body

    if (!proyecto || !proyecto.nombre) {
      return NextResponse.json({
        success: false,
        error: 'Datos del proyecto incompletos. Se requiere nombre.'
      }, { status: 400 })
    }

    // Simulación de análisis IA (reemplazar con AIService real)
    const analisisViabilidad = {
      score: Math.floor(Math.random() * 40) + 60, // 60-100
      factores: [
        { nombre: 'Complejidad Técnica', valor: 'Media', impacto: 'neutral' },
        { nombre: 'Recursos Disponibles', valor: 'Suficientes', impacto: 'positivo' },
        { nombre: 'Tiempo Estimado', valor: 'Adecuado', impacto: 'positivo' },
        { nombre: 'Dependencias', valor: 'Pocas', impacto: 'positivo' }
      ],
      recomendaciones: [
        'El proyecto tiene alta viabilidad de éxito',
        'Se recomienda asignar al desarrollador con más experiencia',
        'Considerar dividir en fases para mejor seguimiento'
      ],
      riesgos: [
        'Posible retraso si no se cuenta con herramientas específicas',
        'Dependencia de aprobaciones externas'
      ],
      tiempoEstimado: {
        optimista: '3 semanas',
        realista: '4-5 semanas',
        pesimista: '7 semanas'
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        viabilidad: analisisViabilidad,
        timestamp: new Date().toISOString(),
        proyectoAnalizado: proyecto.nombre
      }
    })

  } catch (error) {
    console.error('Error en análisis de proyecto:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor durante el análisis'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API de análisis de proyectos funcionando',
    endpoints: {
      POST: 'Analizar viabilidad de proyecto'
    }
  })
}
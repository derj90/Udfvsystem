import { NextRequest, NextResponse } from 'next/server'
import { NotionSyncService } from '@/lib/notion-sync'

export async function POST(request: NextRequest) {
  try {
    const syncService = new NotionSyncService()
    const resultado = await syncService.syncFromNotion()
    
    return NextResponse.json({
      success: true,
      data: resultado,
      message: 'Sincronización completada exitosamente'
    })
  } catch (error) {
    console.error('Error en sincronización:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido en sincronización',
      message: 'Error durante la sincronización con Notion'
    }, { status: 500 })
  }
}

// Webhook handler para cambios en tiempo real desde Notion
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar el webhook de Notion
    if (!body.type || !body.page_id) {
      return NextResponse.json({
        success: false,
        error: 'Payload de webhook inválido'
      }, { status: 400 })
    }

    const syncService = new NotionSyncService()
    await syncService.syncFromNotion()
    
    return NextResponse.json({
      success: true,
      message: 'Webhook procesado correctamente'
    })
  } catch (error) {
    console.error('Error procesando webhook:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error procesando webhook'
    }, { status: 500 })
  }
}

// Endpoint para obtener estado de sincronización
export async function GET() {
  try {
    // En una implementación real, esto vendría de la base de datos
    const estadoSync = {
      ultimaSync: new Date().toISOString(),
      enProgreso: false,
      errores: [],
      registrosProcesados: 0
    }
    
    return NextResponse.json({
      success: true,
      data: estadoSync
    })
  } catch (error) {
    console.error('Error obteniendo estado de sync:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error obteniendo estado de sincronización'
    }, { status: 500 })
  }
}
# 🎯 Sistema de Gestión UDFV

Sistema inteligente de gestión de proyectos con análisis IA para la Unidad de Desarrollo y Formación Virtual de UMCE.

## 🚀 Deploy en Vercel

### 1. Preparar repositorio
```bash
git init
git add .
git commit -m "Initial UDFV system"
git remote add origin https://github.com/tu-usuario/udfv-sistema.git
git push -u origin main
```

### 2. Variables de entorno en Vercel
En el dashboard de Vercel, configurar:

```bash
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=55eed23d7f16c5b1124ae547a67213ca

NOTION_TOKEN=ntn_b20052261055agaoYsHVJxBFOIINNEyWVqPiUu3zEC17Dl
NOTION_PROJECTS_DB_ID=1a0927a437224885846985d0308c9dad
NOTION_ACTIVITIES_DB_ID=8713441fdecc4b94809ae3cca15c47be

ANTHROPIC_API_KEY=your_anthropic_api_key_here

UMCE_INSTITUTION_ID=umce
UMCE_DEPARTMENT=udfv
```

### 3. Deploy
- Conectar repositorio en Vercel
- Deploy automático ✅

## 🎯 Características

### ✅ Ya Implementado
- **Dashboard inteligente** con métricas en tiempo real
- **Análisis IA** de viabilidad de proyectos (Claude)
- **Sincronización Notion** automática
- **APIs REST** para integración
- **UI responsiva** móvil-first
- **Sistema de tipos** TypeScript completo

### 🧠 Motor de IA
- Análisis de viabilidad (scoring 0-100)
- Optimización de recursos del equipo
- Predicción de riesgos automática
- Recomendaciones inteligentes

### 📊 Métricas Clave
- Proyectos activos vs completados
- Ejecución presupuestaria en tiempo real
- Alertas proactivas de riesgos
- ROI y eficiencia del equipo

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## 📁 Estructura del Proyecto

```
udfv-sistema/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   │   ├── ai/           # Análisis IA
│   │   └── notion/       # Sincronización Notion
│   ├── dashboard/        # Dashboard principal
│   └── page.tsx          # Página home
├── components/           # Componentes UI
│   ├── dashboard/       # Dashboard específicos
│   ├── layout/          # Layout y navegación
│   └── ui/              # Componentes base
├── lib/                 # Servicios y utilidades
│   ├── ai-service.ts    # Motor de IA (Claude)
│   ├── database.ts      # Servicio de base de datos
│   └── notion-sync.ts   # Sincronización Notion
└── types/              # Definiciones TypeScript
```

## 🔗 Integraciones

### Notion
- **Proyectos**: `1a0927a437224885846985d0308c9dad`
- **Actividades**: `8713441fdecc4b94809ae3cca15c47be`
- Sincronización bidireccional en tiempo real

### Anthropic Claude
- Análisis de viabilidad de proyectos
- Optimización de recursos
- Predicción de riesgos
- Generación de recomendaciones

### Vercel
- Deploy automático desde GitHub
- Edge functions para APIs
- Postgres para base de datos
- Analytics integrado

## 📈 Flujo de Trabajo

1. **Notion** → Captura de proyectos y actividades
2. **Sistema UDFV** → Procesamiento y análisis IA
3. **Dashboard** → Visualización y toma de decisiones
4. **Reportes** → Métricas para autoridades UMCE

## 🎯 Próximos Pasos

### Fase 2 (Post-Deploy)
- [ ] Conectar base de datos Vercel Postgres
- [ ] Implementar autenticación real con NextAuth
- [ ] Configurar webhooks de Notion
- [ ] Pruebas con datos reales de UDFV

### Fase 3 (Optimización)
- [ ] Caché inteligente de análisis IA
- [ ] Notificaciones push para alertas
- [ ] Exportación de reportes automática
- [ ] Integración con sistemas UMCE

## 👥 Equipo UDFV

Este sistema está diseñado específicamente para:
- **Coordinadores**: Dashboard ejecutivo y toma de decisiones
- **Miembros del equipo**: Gestión personal de tareas
- **Autoridades UMCE**: Reportes de ROI y justificación

---

**Desarrollado con ❤️ para UMCE por el equipo de especialistas en IA**
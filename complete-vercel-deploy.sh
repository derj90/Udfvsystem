#!/bin/bash

# Script completo para deployment en Vercel después de crear el repositorio GitHub

echo "🚀 Completando deployment en Vercel..."
echo "======================================"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio del proyecto"
    exit 1
fi

# Verificar que Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI no está instalado"
    echo "Instalar con: npm install -g vercel"
    exit 1
fi

echo "🔑 Iniciando sesión en Vercel..."
echo "Si no estás logueado, sigue las instrucciones que aparecen"

# Intentar deployment
echo "📦 Desplegando a Vercel..."
vercel --prod --yes --env NEXTAUTH_URL=https://udfv-sistema-gestion.vercel.app \
    --env NEXTAUTH_SECRET=55eed23d7f16c5b1124ae547a67213ca \
    --env NOTION_TOKEN=ntn_b20052261055agaoYsHVJxBFOIINNEyWVqPiUu3zEC17Dl \
    --env NOTION_PROJECTS_DB_ID=1a0927a437224885846985d0308c9dad \
    --env NOTION_ACTIVITIES_DB_ID=8713441fdecc4b94809ae3cca15c47be \
    --env ANTHROPIC_API_KEY=your_anthropic_api_key_here

echo ""
echo "🎯 Deployment completado!"
echo "URL: https://udfv-sistema-gestion.vercel.app"
echo ""
echo "📝 Próximos pasos:"
echo "1. Configurar Vercel Postgres Database en el dashboard"
echo "2. Verificar que todas las funcionalidades trabajen correctamente"
echo "3. Configurar dominio personalizado si es necesario"
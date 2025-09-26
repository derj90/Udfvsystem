#!/bin/bash

# Script para configurar variables de entorno en Vercel de forma automatizada

echo "🔧 Configurando variables de entorno en Vercel..."

# Variables de entorno para producción
PRODUCTION_URL="https://udfv-sistema-gestion.vercel.app"
NEXTAUTH_SECRET="55eed23d7f16c5b1124ae547a67213ca"
NOTION_TOKEN="ntn_b20052261055agaoYsHVJxBFOIINNEyWVqPiUu3zEC17Dl"
NOTION_PROJECTS_DB_ID="1a0927a437224885846985d0308c9dad"
NOTION_ACTIVITIES_DB_ID="8713441fdecc4b94809ae3cca15c47be"
ANTHROPIC_API_KEY="your_anthropic_api_key_here"

echo "Configurando NEXTAUTH_URL..."
echo "$PRODUCTION_URL" | vercel env add NEXTAUTH_URL production

echo "Configurando NEXTAUTH_SECRET..."
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET production

echo "Configurando NOTION_TOKEN..."
echo "$NOTION_TOKEN" | vercel env add NOTION_TOKEN production

echo "Configurando NOTION_PROJECTS_DB_ID..."
echo "$NOTION_PROJECTS_DB_ID" | vercel env add NOTION_PROJECTS_DB_ID production

echo "Configurando NOTION_ACTIVITIES_DB_ID..."
echo "$NOTION_ACTIVITIES_DB_ID" | vercel env add NOTION_ACTIVITIES_DB_ID production

echo "Configurando ANTHROPIC_API_KEY..."
echo "$ANTHROPIC_API_KEY" | vercel env add ANTHROPIC_API_KEY production

echo "✅ Variables de entorno configuradas en Vercel"
echo "🚀 Ejecutando redeploy..."
vercel --prod

echo "🎯 Deployment completado!"
echo "URL: $PRODUCTION_URL"
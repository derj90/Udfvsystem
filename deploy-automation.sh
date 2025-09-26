#!/bin/bash

# UDFV Sistema de Gestión - Automated Deployment Script
# Este script automatiza el deploy completo del sistema

echo "🚀 UDFV Sistema de Gestión - Automated Deployment"
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
REPO_NAME="udfv-sistema-gestion"
VERCEL_PROJECT_NAME="udfv-sistema-gestion"
PRODUCTION_URL="https://udfv-sistema-gestion.vercel.app"

echo -e "${BLUE}📦 Verificando estructura del proyecto...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json${NC}"
    exit 1
fi

if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Error: No se encontró vercel.json${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Estructura del proyecto verificada${NC}"

echo -e "${BLUE}🔧 Verificando dependencias...${NC}"
npm install

echo -e "${BLUE}🏗️  Construyendo proyecto...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build exitoso${NC}"

echo -e "${YELLOW}📝 PASOS MANUALES REQUERIDOS:${NC}"
echo ""
echo -e "${YELLOW}1. CREAR REPOSITORIO GITHUB:${NC}"
echo "   - Ir a: https://github.com/new"
echo "   - Nombre del repositorio: ${REPO_NAME}"
echo "   - Descripción: Sistema de Gestión UDFV con Análisis IA para UMCE"
echo "   - Marcar como Público"
echo "   - NO inicializar con README (ya tenemos archivos)"
echo "   - Crear repositorio"
echo ""

echo -e "${YELLOW}2. CONFIGURAR GIT REMOTE:${NC}"
echo "   Ejecutar estos comandos:"
echo "   git remote add origin https://github.com/TU_USERNAME/${REPO_NAME}.git"
echo "   git push -u origin main"
echo ""

echo -e "${YELLOW}3. DEPLOY A VERCEL:${NC}"
echo "   - Ejecutar: vercel login"
echo "   - Visitar la URL que aparece y autorizar"
echo "   - Ejecutar: vercel --prod"
echo "   - Seleccionar configuraciones:"
echo "     * Link to existing project? No"
echo "     * Project name: ${VERCEL_PROJECT_NAME}"
echo "     * Directory: ./"
echo "     * Auto-detected settings? Yes"
echo ""

echo -e "${YELLOW}4. CONFIGURAR VARIABLES DE ENTORNO EN VERCEL:${NC}"
echo "   Ejecutar estos comandos uno por uno:"
echo ""
echo "   vercel env add NEXTAUTH_URL production"
echo "   # Valor: ${PRODUCTION_URL}"
echo ""
echo "   vercel env add NEXTAUTH_SECRET production"
echo "   # Valor: 55eed23d7f16c5b1124ae547a67213ca"
echo ""
echo "   vercel env add NOTION_TOKEN production"
echo "   # Valor: ntn_b20052261055agaoYsHVJxBFOIINNEyWVqPiUu3zEC17Dl"
echo ""
echo "   vercel env add NOTION_PROJECTS_DB_ID production"
echo "   # Valor: 1a0927a437224885846985d0308c9dad"
echo ""
echo "   vercel env add NOTION_ACTIVITIES_DB_ID production"
echo "   # Valor: 8713441fdecc4b94809ae3cca15c47be"
echo ""
echo "   vercel env add ANTHROPIC_API_KEY production"
echo "   # Valor: your_anthropic_api_key_here"
echo ""

echo -e "${YELLOW}5. CONFIGURAR DATABASE (VERCEL POSTGRES):${NC}"
echo "   - Ir a: https://vercel.com/dashboard"
echo "   - Seleccionar proyecto: ${VERCEL_PROJECT_NAME}"
echo "   - Ir a Storage > Create Database > Postgres"
echo "   - Nombre: udfv-sistema-db"
echo "   - Conectar a proyecto"
echo ""

echo -e "${YELLOW}6. REDEPLOY FINAL:${NC}"
echo "   vercel --prod"
echo ""

echo -e "${GREEN}🎯 URL FINAL ESPERADA: ${PRODUCTION_URL}${NC}"
echo ""

echo -e "${BLUE}📋 FUNCIONALIDADES INCLUIDAS:${NC}"
echo "   ✅ Dashboard inteligente con métricas"
echo "   ✅ Análisis IA de proyectos con Claude"
echo "   ✅ Sincronización automática con Notion"
echo "   ✅ APIs REST para integración"
echo "   ✅ UI responsiva con Tailwind CSS"
echo "   ✅ Autenticación NextAuth"
echo "   ✅ Cron jobs automáticos"
echo ""

echo -e "${GREEN}🚀 ¡Deployment preparation completado!${NC}"
echo -e "${YELLOW}Sigue los pasos manuales arriba para completar el deployment.${NC}"
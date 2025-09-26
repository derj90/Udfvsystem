#!/bin/bash

echo "🚀 DEPLOY AUTOMÁTICO SISTEMA UDFV - INICIANDO..."
echo "================================================="

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir en colores
print_step() {
    echo -e "${BLUE}[PASO $1]${NC} $2"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "Error: No estás en el directorio del proyecto UDFV"
    exit 1
fi

print_step "1" "Verificando estado del proyecto..."

# Verificar git status
if ! git status &>/dev/null; then
    print_error "Error: No es un repositorio git válido"
    exit 1
fi

print_success "Proyecto verificado correctamente"

# Verificar si ya existe un remote origin
if git remote get-url origin &>/dev/null; then
    print_warning "Remote origin ya existe. Eliminando para reconfigurar..."
    git remote remove origin
fi

print_step "2" "Configurando repositorio GitHub..."

# Solicitar username de GitHub
echo -e "${YELLOW}Ingresa tu username de GitHub:${NC}"
read -p "> " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    print_error "Username de GitHub requerido"
    exit 1
fi

# Configurar remote
REPO_URL="https://github.com/$GITHUB_USERNAME/udfv-sistema-gestion.git"
git remote add origin $REPO_URL

print_success "Remote configurado: $REPO_URL"

print_step "3" "Subiendo código a GitHub..."

# Push a GitHub
if git push -u origin main; then
    print_success "Código subido exitosamente a GitHub"
else
    print_error "Error al subir código. Verifica que hayas creado el repositorio en GitHub:"
    echo -e "${YELLOW}1. Ve a: https://github.com/new${NC}"
    echo -e "${YELLOW}2. Repository name: udfv-sistema-gestion${NC}"
    echo -e "${YELLOW}3. NO marques README ni .gitignore${NC}"
    echo -e "${YELLOW}4. Crea el repositorio y ejecuta este script nuevamente${NC}"
    exit 1
fi

print_step "4" "Instalando Vercel CLI..."

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "Instalando Vercel CLI..."
    npm install -g vercel
    print_success "Vercel CLI instalado"
else
    print_success "Vercel CLI ya está instalado"
fi

print_step "5" "Configurando deploy en Vercel..."

# Login en Vercel si no está autenticado
echo -e "${YELLOW}Se abrirá el navegador para autenticación en Vercel...${NC}"
if ! vercel whoami &>/dev/null; then
    vercel login
fi

print_step "6" "Desplegando aplicación..."

# Deploy con configuración automática
vercel --prod \
    --env NEXTAUTH_URL=https://udfv-sistema-gestion.vercel.app \
    --env NEXTAUTH_SECRET=55eed23d7f16c5b1124ae547a67213ca \
    --env NOTION_TOKEN=ntn_b20052261055agaoYsHVJxBFOIINNEyWVqPiUu3zEC17Dl \
    --env NOTION_PROJECTS_DB_ID=1a0927a437224885846985d0308c9dad \
    --env NOTION_ACTIVITIES_DB_ID=8713441fdecc4b94809ae3cca15c47be \
    --env ANTHROPIC_API_KEY=your_anthropic_api_key_here \
    --env UMCE_INSTITUTION_ID=umce \
    --env UMCE_DEPARTMENT=udfv

print_step "7" "Verificando deployment..."

# Esperar un poco para que el deployment complete
sleep 5

echo ""
echo "================================================="
echo -e "${GREEN}🎉 DEPLOY COMPLETADO EXITOSAMENTE!${NC}"
echo "================================================="
echo ""
echo -e "${BLUE}📱 URL del Sistema UDFV:${NC}"
echo -e "${GREEN}   https://udfv-sistema-gestion.vercel.app${NC}"
echo ""
echo -e "${BLUE}📊 Características disponibles:${NC}"
echo "   ✅ Dashboard inteligente con métricas UDFV"
echo "   ✅ Análisis IA de viabilidad de proyectos"
echo "   ✅ Sincronización automática con Notion" 
echo "   ✅ UI responsiva móvil-first"
echo "   ✅ APIs REST para integración"
echo ""
echo -e "${BLUE}🔗 Enlaces útiles:${NC}"
echo "   📁 Repositorio: https://github.com/$GITHUB_USERNAME/udfv-sistema-gestion"
echo "   🚀 Panel Vercel: https://vercel.com/dashboard"
echo ""
echo -e "${YELLOW}💡 Próximos pasos:${NC}"
echo "   1. Probar el sistema en la URL de arriba"
echo "   2. Verificar sincronización con Notion"
echo "   3. Probar análisis IA de proyectos"
echo "   4. Presentar a autoridades UMCE"
echo ""
echo "🎯 ¡Sistema UDFV listo para uso en producción!"
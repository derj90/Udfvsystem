#!/bin/bash

echo "🚀 DEPLOY RÁPIDO SISTEMA UDFV"
echo "=============================="

# Configurar con un username temporal - el usuario puede cambiarlo después
GITHUB_USERNAME=${1:-"tu-usuario-github"}

echo "📝 Usando username: $GITHUB_USERNAME"
echo "   (Si es incorrecto, ejecuta: ./quick-deploy.sh TU-USERNAME-REAL)"

# Verificar git
if [ ! -d ".git" ]; then
    echo "❌ Error: No es un repositorio git"
    exit 1
fi

# Remover origin si existe
git remote remove origin 2>/dev/null || true

# Configurar remote
git remote add origin https://github.com/$GITHUB_USERNAME/udfv-sistema-gestion.git

echo "✅ Remote configurado"

# Crear commit final si hay cambios
git add -A 2>/dev/null || true
git commit -m "🚀 Deploy automático - Sistema UDFV listo para producción" 2>/dev/null || true

echo "📤 Subiendo a GitHub..."
if git push -u origin main 2>/dev/null; then
    echo "✅ Código subido a GitHub exitosamente"
else
    echo "⚠️  Para completar el deploy:"
    echo "   1. Crea el repositorio en: https://github.com/new"
    echo "   2. Repository name: udfv-sistema-gestion"
    echo "   3. Ejecuta: git push -u origin main"
    echo "   4. Luego continúa con Vercel"
fi

echo ""
echo "🌐 SIGUIENTE PASO - VERCEL:"
echo "=========================="
echo "1. Ve a: https://vercel.com/new"
echo "2. Import repository: $GITHUB_USERNAME/udfv-sistema-gestion"
echo "3. Environment Variables (copia y pega):"
echo ""
echo "NEXTAUTH_URL=https://udfv-sistema-gestion.vercel.app"
echo "NEXTAUTH_SECRET=55eed23d7f16c5b1124ae547a67213ca"
echo "NOTION_TOKEN=ntn_b20052261055agaoYsHVJxBFOIINNEyWVqPiUu3zEC17Dl"
echo "NOTION_PROJECTS_DB_ID=1a0927a437224885846985d0308c9dad"
echo "NOTION_ACTIVITIES_DB_ID=8713441fdecc4b94809ae3cca15c47be"
echo "ANTHROPIC_API_KEY=your_anthropic_api_key_here"
echo "UMCE_INSTITUTION_ID=umce"
echo "UMCE_DEPARTMENT=udfv"
echo ""
echo "4. Click 'Deploy'"
echo ""
echo "🎯 URL FINAL: https://udfv-sistema-gestion.vercel.app"
echo "⏱️  Tiempo total: 3-5 minutos"
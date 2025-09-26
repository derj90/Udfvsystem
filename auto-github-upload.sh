#!/bin/bash

# ===================================
# SUBIDA AUTOMÁTICA COMPLETA A GITHUB
# Sistema UDFV - UMCE
# ===================================

echo "🚀 SISTEMA DE SUBIDA AUTOMÁTICA A GITHUB"
echo "========================================"
echo "📁 Proyecto: Sistema UDFV - Gestión Universitaria"
echo "🎯 Destino: https://github.com/derj90/udfv-sistema-gestion"
echo ""

# Función para mostrar progreso
show_progress() {
    echo "⏳ $1..."
    sleep 1
}

# Verificar directorio
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Ejecuta desde el directorio del proyecto UDFV"
    exit 1
fi

show_progress "Verificando estado del repositorio"

# Mostrar información del proyecto
echo "📊 INFORMACIÓN DEL PROYECTO:"
echo "• Commits totales: $(git rev-list --count HEAD)"
echo "• Último commit: $(git log -1 --pretty=format:'%h - %s')"
echo "• Archivos del proyecto: $(find . -name '*.tsx' -o -name '*.ts' -o -name '*.json' -o -name '*.js' -o -name '*.md' | grep -v node_modules | wc -l)"
echo "• Estado del working tree: $(git status --porcelain | wc -l) archivos sin commit"
echo ""

# Intentar métodos automáticos en orden de preferencia
echo "🔄 INTENTANDO MÉTODOS AUTOMÁTICOS..."
echo ""

# Método 1: GitHub CLI
echo "1️⃣  Verificando GitHub CLI..."
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI disponible"
    if gh auth status &> /dev/null 2>&1; then
        echo "✅ Autenticado con GitHub CLI"
        echo "📤 Subiendo con GitHub CLI..."
        if git push origin main; then
            echo ""
            echo "🎉 ¡ÉXITO! Código subido con GitHub CLI"
            echo "🌐 Verifica en: https://github.com/derj90/udfv-sistema-gestion"
            echo "✨ Listo para deploy en Vercel"
            exit 0
        else
            echo "❌ Error en push con GitHub CLI"
        fi
    else
        echo "⚠️  GitHub CLI no autenticado"
        echo "💡 Ejecuta './install-github-cli.sh' para configurar"
    fi
else
    echo "❌ GitHub CLI no disponible"
fi

# Método 2: Git directo
echo ""
echo "2️⃣  Intentando git push directo..."
if git push origin main 2>/dev/null; then
    echo "🎉 ¡ÉXITO! Código subido directamente"
    echo "🌐 Verifica en: https://github.com/derj90/udfv-sistema-gestion"
    echo "✨ Listo para deploy en Vercel"
    exit 0
else
    echo "❌ Git push falló (autenticación requerida)"
fi

# Método 3: Preparar bundle y mostrar instrucciones
echo ""
echo "3️⃣  Preparando bundle para subida manual..."
git bundle create udfv-complete-system.bundle --all
echo "✅ Bundle creado: udfv-complete-system.bundle"

echo ""
echo "🆘 SUBIDA MANUAL REQUERIDA"
echo "========================="
echo ""
echo "La subida automática no fue posible. Sigue estos pasos:"
echo ""
echo "📝 OPCIÓN A - PERSONAL ACCESS TOKEN (RECOMENDADO):"
echo ""
echo "1. Crea un token en: https://github.com/settings/tokens"
echo "   • Click 'Generate new token (classic)'"
echo "   • Nombre: 'UDFV Sistema Upload'"
echo "   • Permisos: ✅ repo (completo)"
echo "   • Click 'Generate token'"
echo "   • 🔑 COPIA EL TOKEN (aparece solo una vez)"
echo ""
echo "2. Configura el token (reemplaza YOUR_TOKEN):"
echo "   git remote set-url origin https://derj90:YOUR_TOKEN@github.com/derj90/udfv-sistema-gestion.git"
echo ""
echo "3. Sube el código:"
echo "   git push origin main"
echo ""

echo "📝 OPCIÓN B - GITHUB CLI:"
echo ""
echo "1. Instala GitHub CLI:"
echo "   ./install-github-cli.sh"
echo ""
echo "2. Autentica:"
echo "   gh auth login"
echo ""
echo "3. Sube el código:"
echo "   git push origin main"
echo ""

echo "📝 OPCIÓN C - SUBIDA MANUAL DE ARCHIVOS:"
echo ""
echo "1. Ve a: https://github.com/derj90/udfv-sistema-gestion"
echo "2. Click 'Add file' > 'Upload files'"
echo "3. Arrastra todos los archivos del proyecto (excepto node_modules y .git)"
echo "4. Commit message: 'Sistema UDFV completo para UMCE'"
echo "5. Click 'Commit changes'"
echo ""

# Crear lista de archivos para subida manual
echo "📋 ARCHIVOS PRINCIPALES A SUBIR:"
find . -name '*.tsx' -o -name '*.ts' -o -name '*.json' -o -name '*.js' -o -name '*.md' | grep -v node_modules | head -20
echo "   ... y $(find . -name '*.tsx' -o -name '*.ts' -o -name '*.json' -o -name '*.js' -o -name '*.md' | grep -v node_modules | wc -l) archivos más"
echo ""

echo "🎯 VERIFICACIÓN FINAL:"
echo "Una vez subido, verifica que estos archivos clave estén en GitHub:"
echo "• ✅ package.json (dependencias)"
echo "• ✅ next.config.js (configuración Next.js)"
echo "• ✅ app/layout.tsx (layout principal)"
echo "• ✅ components/ (componentes React)"
echo "• ✅ lib/ (servicios y utilidades)"
echo "• ✅ README.md (documentación)"
echo ""

echo "🚀 SIGUIENTE PASO - DEPLOY EN VERCEL:"
echo "1. Ve a: https://vercel.com"
echo "2. Click 'New Project'"
echo "3. Importa: derj90/udfv-sistema-gestion"
echo "4. Deploy automático"
echo ""

echo "📧 SOPORTE:"
echo "Si tienes problemas, revisa los logs de error y la documentación en:"
echo "• DEPLOY.md"
echo "• DEPLOYMENT-GUIDE.md"
echo ""

echo "✨ ¡El Sistema UDFV está listo para ser desplegado!"
echo "🎓 Universidad Metropolitana de Ciencias de la Educación"
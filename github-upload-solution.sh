#!/bin/bash

# ===================================
# SOLUCIÓN AUTOMÁTICA PARA SUBIR CÓDIGO A GITHUB
# Sistema UDFV - Universidad Metropolitana de Ciencias de la Educación
# ===================================

echo "🚀 INICIANDO PROCESO DE SUBIDA AUTOMÁTICA A GITHUB"
echo "==============================================="

# Verificar si estamos en el directorio correcto
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Ejecuta este script desde el directorio del proyecto"
    exit 1
fi

echo "📁 Directorio actual: $(pwd)"
echo "🎯 Repositorio destino: https://github.com/derj90/udfv-sistema-gestion"

# MÉTODO 1: Intentar con GitHub CLI si está disponible
echo ""
echo "🔍 MÉTODO 1: Verificando GitHub CLI..."
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI encontrado"
    echo "🔐 Intentando autenticación con GitHub CLI..."
    
    if gh auth status &> /dev/null; then
        echo "✅ Ya autenticado con GitHub CLI"
        echo "📤 Intentando push con GitHub CLI..."
        git push origin main
        if [[ $? -eq 0 ]]; then
            echo "🎉 ¡ÉXITO! Código subido con GitHub CLI"
            exit 0
        fi
    else
        echo "⚠️  GitHub CLI no autenticado"
        echo "💡 Ejecuta: gh auth login"
    fi
else
    echo "❌ GitHub CLI no disponible"
fi

# MÉTODO 2: Verificar si ya hay un token configurado
echo ""
echo "🔍 MÉTODO 2: Verificando configuración actual..."
echo "🔐 Intentando push directo..."
git push origin main 2>&1
if [[ $? -eq 0 ]]; then
    echo "🎉 ¡ÉXITO! Código subido directamente"
    exit 0
fi

# MÉTODO 3: Configuración manual con token
echo ""
echo "🔍 MÉTODO 3: Configuración manual requerida"
echo "==============================================="
echo ""
echo "❌ La autenticación automática ha fallado."
echo "📋 SIGUE ESTOS PASOS PARA COMPLETAR LA SUBIDA:"
echo ""
echo "1️⃣  CREAR PERSONAL ACCESS TOKEN:"
echo "   • Ve a: https://github.com/settings/tokens"
echo "   • Click 'Generate new token (classic)'"
echo "   • Nombre: 'UDFV Sistema Upload'"
echo "   • Permisos necesarios: ✅ repo (todos los sub-permisos)"
echo "   • Click 'Generate token'"
echo "   • ⚠️  COPIA EL TOKEN INMEDIATAMENTE (solo se muestra una vez)"
echo ""
echo "2️⃣  CONFIGURAR TOKEN EN GIT:"
echo "   Ejecuta este comando reemplazando YOUR_TOKEN:"
echo "   git remote set-url origin https://derj90:YOUR_TOKEN@github.com/derj90/udfv-sistema-gestion.git"
echo ""
echo "3️⃣  SUBIR CÓDIGO:"
echo "   git push origin main"
echo ""

# MÉTODO 4: Crear bundle para subida manual
echo "🔍 MÉTODO 4: Preparando bundle para subida manual..."
echo "📦 Creando bundle del repositorio..."

git bundle create udfv-sistema-bundle.bundle --all
echo "✅ Bundle creado: udfv-sistema-bundle.bundle"

echo ""
echo "📋 ALTERNATIVA CON BUNDLE:"
echo "1. Sube el archivo 'udfv-sistema-bundle.bundle' a tu repositorio GitHub"
echo "2. En tu repositorio GitHub vacío, clona y aplica el bundle:"
echo "   git clone https://github.com/derj90/udfv-sistema-gestion.git temp-repo"
echo "   cd temp-repo"
echo "   git bundle unbundle ../udfv-sistema-bundle.bundle"
echo "   git push origin main"
echo ""

# MÉTODO 5: Comandos directos para copiar y pegar
echo "🔍 MÉTODO 5: Comandos listos para copiar y pegar"
echo "=============================================="
echo ""
echo "Si prefieres hacer todo manualmente, aquí están los comandos:"
echo ""
echo "# 1. Configurar token (reemplaza YOUR_TOKEN):"
echo 'git remote set-url origin https://derj90:YOUR_TOKEN@github.com/derj90/udfv-sistema-gestion.git'
echo ""
echo "# 2. Verificar configuración:"
echo "git remote -v"
echo ""
echo "# 3. Subir código:"
echo "git push origin main"
echo ""
echo "# 4. Verificar en GitHub:"
echo "# Ve a: https://github.com/derj90/udfv-sistema-gestion"
echo ""

# Información adicional
echo "📊 INFORMACIÓN DEL PROYECTO:"
echo "• Total de commits: $(git rev-list --count HEAD)"
echo "• Último commit: $(git log -1 --pretty=format:'%h - %s (%cr)')"
echo "• Archivos a subir: $(find . -type f | grep -v '.git' | grep -v 'node_modules' | wc -l) archivos"
echo "• Tamaño del bundle: $(ls -lh udfv-sistema-bundle.bundle | awk '{print $5}')"
echo ""

echo "🎯 OBJETIVO FINAL:"
echo "   Código disponible en: https://github.com/derj90/udfv-sistema-gestion"
echo "   Listo para deploy en Vercel"
echo ""
echo "💡 AYUDA ADICIONAL:"
echo "   • Documentación GitHub Tokens: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
echo "   • Si tienes problemas, ejecuta: git status && git log --oneline"
echo ""
echo "✨ ¡El sistema está listo para ser desplegado una vez subido a GitHub!"
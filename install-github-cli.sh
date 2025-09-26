#!/bin/bash

# ===================================
# INSTALACIÓN AUTOMÁTICA DE GITHUB CLI
# Para subir Sistema UDFV automáticamente
# ===================================

echo "🔧 INSTALANDO GITHUB CLI AUTOMÁTICAMENTE"
echo "========================================"

# Detectar el sistema operativo
OS="$(uname -s)"
echo "🖥️  Sistema operativo detectado: $OS"

case "$OS" in
    Darwin*)
        echo "🍎 Instalando en macOS..."
        if command -v brew &> /dev/null; then
            echo "🍺 Homebrew detectado, instalando GitHub CLI..."
            brew install gh
        else
            echo "❌ Homebrew no encontrado"
            echo "💡 Instala Homebrew primero: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            echo "💡 O descarga GitHub CLI manualmente: https://github.com/cli/cli/releases"
            exit 1
        fi
        ;;
    Linux*)
        echo "🐧 Instalando en Linux..."
        if command -v apt &> /dev/null; then
            echo "📦 Usando apt (Ubuntu/Debian)..."
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
            sudo apt update
            sudo apt install gh
        elif command -v yum &> /dev/null; then
            echo "📦 Usando yum (CentOS/RHEL)..."
            sudo yum install -y gh
        elif command -v dnf &> /dev/null; then
            echo "📦 Usando dnf (Fedora)..."
            sudo dnf install -y gh
        else
            echo "❌ Gestor de paquetes no soportado"
            echo "💡 Descarga GitHub CLI manualmente: https://github.com/cli/cli/releases"
            exit 1
        fi
        ;;
    *)
        echo "❌ Sistema operativo no soportado: $OS"
        echo "💡 Descarga GitHub CLI manualmente: https://github.com/cli/cli/releases"
        exit 1
        ;;
esac

# Verificar instalación
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI instalado correctamente"
    echo "📋 Versión: $(gh --version)"
    echo ""
    echo "🔐 SIGUIENTE PASO: AUTENTICACIÓN"
    echo "==============================="
    echo "1. Ejecuta: gh auth login"
    echo "2. Selecciona 'GitHub.com'"
    echo "3. Selecciona 'HTTPS'"
    echo "4. Selecciona 'Login with a web browser'"
    echo "5. Copia el código y presiona Enter"
    echo "6. Pega el código en el navegador"
    echo ""
    echo "🚀 DESPUÉS DE LA AUTENTICACIÓN:"
    echo "git push origin main"
    echo ""
    echo "✨ ¡El Sistema UDFV se subirá automáticamente!"
else
    echo "❌ Error en la instalación de GitHub CLI"
    echo "💡 Intenta descargar manualmente: https://github.com/cli/cli/releases"
    exit 1
fi
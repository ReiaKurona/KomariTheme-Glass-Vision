@echo off
chcp 65001 >nul
echo.
echo 🚀 Komari 液态玻璃主题一键构建工具 v1.3.2
echo ================================================
echo.

REM 检查是否安装了 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 Node.js
    echo.
    echo 💡 请先安装 Node.js:
    echo    1. 访问 https://nodejs.org/
    echo    2. 下载并安装 LTS 版本
    echo    3. 重启命令行后重新运行此脚本
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
node --version
echo.

REM 检查项目文件
if not exist "dist\index.html" (
    echo ❌ 错误: 未找到 dist\index.html 文件
    echo.
    echo 💡 请确保项目文件完整
    echo.
    pause
    exit /b 1
)

if not exist "komari-theme.json" (
    echo ❌ 错误: 未找到 komari-theme.json 文件
    echo.
    echo 💡 请确保项目文件完整
    echo.
    pause
    exit /b 1
)

echo ✅ 项目文件检查通过
echo.

echo 🔨 开始构建主题包...
echo.
node build.js
if errorlevel 1 (
    echo ❌ 构建失败
    echo.
    pause
    exit /b 1
)

echo.
echo 🎉 构建完成！
echo.
echo 📦 生成的文件: komari-liquid-glass-theme.zip
echo.
echo 📋 使用方法:
echo    1. 登录 Komari 管理面板
echo    2. 进入主题管理页面
echo    3. 上传 komari-liquid-glass-theme.zip 文件
echo    4. 启用 "Liquid Glass iOS 26" 主题
echo.
echo 按任意键退出...
pause >nul
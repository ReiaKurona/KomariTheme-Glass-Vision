#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "🚀 Komari 液态玻璃主题一键构建工具 v1.3.2"
echo "================================================"
echo -e "${NC}"

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: 未找到 Node.js${NC}"
    echo ""
    echo -e "${YELLOW}💡 请先安装 Node.js:${NC}"
    echo "   1. 访问 https://nodejs.org/"
    echo "   2. 下载并安装 LTS 版本"
    echo "   3. 重启终端后重新运行此脚本"
    echo ""
    echo "   或使用包管理器安装:"
    echo "   • Ubuntu/Debian: sudo apt install nodejs npm"
    echo "   • CentOS/RHEL: sudo yum install nodejs npm"
    echo "   • macOS: brew install node"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Node.js 已安装${NC}"
node --version
echo ""

# 检查项目文件
if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ 错误: 未找到 dist/index.html 文件${NC}"
    echo ""
    echo -e "${YELLOW}💡 请确保项目文件完整${NC}"
    echo ""
    exit 1
fi

if [ ! -f "komari-theme.json" ]; then
    echo -e "${RED}❌ 错误: 未找到 komari-theme.json 文件${NC}"
    echo ""
    echo -e "${YELLOW}💡 请确保项目文件完整${NC}"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ 项目文件检查通过${NC}"
echo ""

echo -e "${CYAN}🔨 开始构建主题包...${NC}"
echo ""

node build.js
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    echo ""
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 构建完成！${NC}"
echo ""
echo -e "${PURPLE}📦 生成的文件: komari-liquid-glass-theme.zip${NC}"
echo ""
echo -e "${YELLOW}📋 使用方法:${NC}"
echo "   1. 登录 Komari 管理面板"
echo "   2. 进入主题管理页面"
echo "   3. 上传 komari-liquid-glass-theme.zip 文件"
echo "   4. 启用 \"Liquid Glass iOS 26\" 主题"
echo ""
echo -e "${GREEN}构建完成，按 Enter 键退出...${NC}"
read
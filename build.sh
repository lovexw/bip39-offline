#!/bin/bash
# 可复现构建脚本 / Reproducible Build Script

set -e

echo "================================================"
echo "BIP39 离线助记词生成器 - 构建与验证"
echo "BIP39 Offline Mnemonic Generator - Build & Verify"
echo "================================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查必要文件
echo "1. 检查必要文件 / Checking required files..."
REQUIRED_FILES=(
    "index.html"
    "styles.css"
    "crypto-utils.js"
    "bip39.js"
    "bip32.js"
    "app.js"
    "README.md"
    "test.html"
)

all_files_exist=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file (缺失 / missing)"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = false ]; then
    echo -e "\n${RED}错误: 缺少必要文件 / Error: Missing required files${NC}"
    exit 1
fi

echo -e "\n${GREEN}所有必要文件存在 / All required files exist${NC}\n"

# 生成文件哈希
echo "2. 生成文件哈希 / Generating file hashes..."
if command -v sha256sum &> /dev/null; then
    sha256sum "${REQUIRED_FILES[@]}" > checksums.txt
    echo -e "${GREEN}✓${NC} 哈希清单已生成: checksums.txt"
    echo ""
    cat checksums.txt
elif command -v shasum &> /dev/null; then
    shasum -a 256 "${REQUIRED_FILES[@]}" > checksums.txt
    echo -e "${GREEN}✓${NC} 哈希清单已生成: checksums.txt"
    echo ""
    cat checksums.txt
else
    echo -e "${YELLOW}警告: 未找到 sha256sum 或 shasum 命令${NC}"
    echo -e "${YELLOW}Warning: sha256sum or shasum command not found${NC}"
fi

echo ""

# 检查文件大小
echo "3. 检查文件大小 / Checking file sizes..."
total_size=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        size_kb=$((size / 1024))
        total_size=$((total_size + size))
        echo "  $file: ${size_kb} KB"
    fi
done

total_kb=$((total_size / 1024))
echo -e "\n  总大小 / Total size: ${total_kb} KB"
echo ""

# 检查是否存在外部依赖
echo "4. 检查外部依赖 / Checking external dependencies..."
external_deps_found=false

for file in *.html *.js; do
    if [ -f "$file" ]; then
        # 检查外部 CDN 链接
        if grep -q "https\?://.*cdn\|https\?://.*googleapis" "$file"; then
            echo -e "  ${RED}✗${NC} $file 包含外部 CDN 引用"
            external_deps_found=true
        fi
        
        # 检查外部脚本
        if grep -q "<script src=\"https\?://" "$file"; then
            echo -e "  ${RED}✗${NC} $file 包含外部脚本引用"
            external_deps_found=true
        fi
    fi
done

if [ "$external_deps_found" = false ]; then
    echo -e "${GREEN}✓${NC} 未发现外部依赖 / No external dependencies found"
else
    echo -e "${YELLOW}警告: 发现外部依赖，不适合离线使用${NC}"
    echo -e "${YELLOW}Warning: External dependencies found, not suitable for offline use${NC}"
fi

echo ""

# 验证 CSP 安全策略
echo "5. 验证内容安全策略 / Verifying Content Security Policy..."
if grep -q "Content-Security-Policy" index.html; then
    echo -e "${GREEN}✓${NC} index.html 包含 CSP 策略"
    grep "Content-Security-Policy" index.html
else
    echo -e "${YELLOW}警告: 未找到 CSP 策略${NC}"
fi

echo ""

# 检查敏感信息泄漏
echo "6. 检查敏感信息泄漏 / Checking for sensitive information leaks..."
sensitive_found=false

for file in *.js; do
    if [ -f "$file" ]; then
        # 检查 console.log 输出助记词
        if grep -q "console\.log.*mnemonic\|console\.log.*seed\|console\.log.*private" "$file"; then
            echo -e "  ${YELLOW}⚠${NC} $file 可能包含敏感信息日志"
        fi
        
        # 检查自动复制
        if grep -q "navigator\.clipboard\.writeText" "$file"; then
            echo -e "  ${YELLOW}⚠${NC} $file 包含自动剪贴板操作"
        fi
        
        # 检查网络请求
        if grep -q "fetch\|XMLHttpRequest\|axios" "$file"; then
            echo -e "  ${RED}✗${NC} $file 包含网络请求代码"
            sensitive_found=true
        fi
    fi
done

if [ "$sensitive_found" = false ]; then
    echo -e "${GREEN}✓${NC} 未发现明显的安全问题"
else
    echo -e "${RED}警告: 发现潜在安全问题${NC}"
fi

echo ""

# 统计代码行数
echo "7. 代码统计 / Code statistics..."
echo "  JavaScript 文件:"
for file in *.js; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file")
        echo "    $file: $lines 行"
    fi
done

echo ""

# 生成发布包
echo "8. 生成发布包 / Creating release package..."
RELEASE_NAME="bip39-offline-generator-v1.0.0"
mkdir -p releases

if command -v zip &> /dev/null; then
    zip -q "releases/${RELEASE_NAME}.zip" "${REQUIRED_FILES[@]}" checksums.txt
    echo -e "${GREEN}✓${NC} 发布包已生成: releases/${RELEASE_NAME}.zip"
else
    echo -e "${YELLOW}警告: 未找到 zip 命令，跳过打包${NC}"
fi

echo ""

# 显示使用说明
echo "================================================"
echo "构建完成 / Build Complete!"
echo "================================================"
echo ""
echo "下一步 / Next steps:"
echo ""
echo "1. 验证文件完整性 / Verify file integrity:"
echo "   sha256sum -c checksums.txt"
echo ""
echo "2. (可选) 生成 GPG 签名 / (Optional) Generate GPG signature:"
echo "   gpg --detach-sign --armor checksums.txt"
echo ""
echo "3. 在浏览器中测试 / Test in browser:"
echo "   打开 index.html 或 test.html"
echo "   Open index.html or test.html"
echo ""
echo "4. 离线部署 / Offline deployment:"
echo "   将所有文件复制到 USB 驱动器"
echo "   Copy all files to USB drive"
echo ""
echo -e "${YELLOW}⚠️  重要提示 / IMPORTANT:${NC}"
echo "   生成真实资产的助记词前，请先审计所有源代码！"
echo "   Audit all source code before generating real asset mnemonics!"
echo ""

#!/bin/bash
# 文件完整性验证脚本 / File Integrity Verification Script

set -e

echo "================================================"
echo "BIP39 离线助记词生成器 - 完整性验证"
echo "BIP39 Offline Mnemonic Generator - Integrity Check"
echo "================================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 checksums.txt 是否存在
if [ ! -f "checksums.txt" ]; then
    echo -e "${RED}错误: checksums.txt 文件不存在${NC}"
    echo -e "${RED}Error: checksums.txt file not found${NC}"
    echo ""
    echo "请先运行构建脚本生成哈希清单:"
    echo "Please run build script first to generate checksums:"
    echo "  ./build.sh"
    exit 1
fi

# 验证文件完整性
echo "1. 验证文件完整性 / Verifying file integrity..."
echo ""

if command -v sha256sum &> /dev/null; then
    if sha256sum -c checksums.txt 2>&1; then
        echo ""
        echo -e "${GREEN}✓ 所有文件完整性验证通过${NC}"
        echo -e "${GREEN}✓ All files integrity check passed${NC}"
    else
        echo ""
        echo -e "${RED}✗ 文件完整性验证失败${NC}"
        echo -e "${RED}✗ File integrity check failed${NC}"
        echo ""
        echo -e "${YELLOW}警告: 文件可能已被修改，请重新下载或审计代码${NC}"
        echo -e "${YELLOW}Warning: Files may have been modified, please re-download or audit code${NC}"
        exit 1
    fi
elif command -v shasum &> /dev/null; then
    if shasum -a 256 -c checksums.txt 2>&1; then
        echo ""
        echo -e "${GREEN}✓ 所有文件完整性验证通过${NC}"
        echo -e "${GREEN}✓ All files integrity check passed${NC}"
    else
        echo ""
        echo -e "${RED}✗ 文件完整性验证失败${NC}"
        echo -e "${RED}✗ File integrity check failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}警告: 未找到 sha256sum 或 shasum 命令${NC}"
    echo -e "${YELLOW}Warning: sha256sum or shasum command not found${NC}"
    exit 1
fi

echo ""

# 检查 GPG 签名（如果存在）
if [ -f "checksums.txt.sig" ] || [ -f "checksums.txt.asc" ]; then
    echo "2. 验证 GPG 签名 / Verifying GPG signature..."
    echo ""
    
    if command -v gpg &> /dev/null; then
        sig_file=""
        if [ -f "checksums.txt.sig" ]; then
            sig_file="checksums.txt.sig"
        elif [ -f "checksums.txt.asc" ]; then
            sig_file="checksums.txt.asc"
        fi
        
        if gpg --verify "$sig_file" checksums.txt 2>&1; then
            echo ""
            echo -e "${GREEN}✓ GPG 签名验证通过${NC}"
            echo -e "${GREEN}✓ GPG signature verified${NC}"
        else
            echo ""
            echo -e "${YELLOW}警告: GPG 签名验证失败${NC}"
            echo -e "${YELLOW}Warning: GPG signature verification failed${NC}"
        fi
    else
        echo -e "${YELLOW}警告: 未找到 gpg 命令${NC}"
        echo -e "${YELLOW}Warning: gpg command not found${NC}"
    fi
    echo ""
fi

# 安全检查清单
echo "3. 安全检查清单 / Security Checklist"
echo "================================================"
echo ""

checks_passed=0
total_checks=8

echo -n "□ 是否在完全离线的环境中？ / Completely offline? "
read -p "[y/n] " offline
if [ "$offline" = "y" ] || [ "$offline" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${RED}✗ 建议断开网络连接${NC}"
fi

echo -n "□ 是否已审计所有源代码？ / Audited all source code? "
read -p "[y/n] " audited
if [ "$audited" = "y" ] || [ "$audited" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${YELLOW}⚠ 强烈建议在使用前审计代码${NC}"
fi

echo -n "□ 文件完整性验证是否通过？ / File integrity verified? "
read -p "[y/n] " integrity
if [ "$integrity" = "y" ] || [ "$integrity" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${RED}✗ 必须验证文件完整性${NC}"
fi

echo -n "□ 是否使用 air-gapped 设备？ / Using air-gapped device? "
read -p "[y/n] " airgapped
if [ "$airgapped" = "y" ] || [ "$airgapped" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${YELLOW}⚠ 建议使用从未联网的设备${NC}"
fi

echo -n "□ 是否了解助记词安全存储方法？ / Know secure storage? "
read -p "[y/n] " storage
if [ "$storage" = "y" ] || [ "$storage" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${YELLOW}⚠ 请阅读 README 中的安全指南${NC}"
fi

echo -n "□ 是否准备纸质备份材料？ / Paper backup ready? "
read -p "[y/n] " paper
if [ "$paper" = "y" ] || [ "$paper" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${YELLOW}⚠ 建议准备纸质备份${NC}"
fi

echo -n "□ 是否在私密环境中操作？ / Private environment? "
read -p "[y/n] " private
if [ "$private" = "y" ] || [ "$private" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${YELLOW}⚠ 避免在公共场所操作${NC}"
fi

echo -n "□ 是否理解助记词永远不可恢复？ / Understand irrecoverable? "
read -p "[y/n] " understand
if [ "$understand" = "y" ] || [ "$understand" = "Y" ]; then
    echo -e "  ${GREEN}✓${NC}"
    checks_passed=$((checks_passed + 1))
else
    echo -e "  ${RED}✗ 请务必理解：丢失助记词 = 丢失资产${NC}"
fi

echo ""
echo "================================================"
echo "安全检查结果 / Security Check Result"
echo "================================================"
echo ""
echo -e "通过: ${checks_passed}/${total_checks}"
echo ""

if [ $checks_passed -eq $total_checks ]; then
    echo -e "${GREEN}✓ 所有安全检查通过，可以安全使用${NC}"
    echo -e "${GREEN}✓ All security checks passed, safe to use${NC}"
elif [ $checks_passed -ge 6 ]; then
    echo -e "${YELLOW}⚠ 大部分检查通过，但仍需注意未通过的项目${NC}"
    echo -e "${YELLOW}⚠ Most checks passed, but please address failed items${NC}"
else
    echo -e "${RED}✗ 安全检查未充分通过，不建议使用${NC}"
    echo -e "${RED}✗ Security checks not sufficiently passed, not recommended${NC}"
fi

echo ""
echo "================================================"
echo ""
echo "如果所有检查通过，现在可以打开 index.html 使用工具。"
echo "If all checks passed, you can now open index.html to use the tool."
echo ""
echo -e "${YELLOW}⚠️  最后提醒:${NC}"
echo "   - 仅在测试时使用测试助记词"
echo "   - 生成真实资产的助记词前三思"
echo "   - 妥善保管助记词，永远不要泄露"
echo ""

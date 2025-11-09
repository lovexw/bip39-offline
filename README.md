# 🔐 离线助记词生成器 / Offline Mnemonic Generator

**简洁、安全、完全离线的 BIP39 助记词生成工具**

A minimal, secure, and completely offline BIP39 mnemonic generator.

---

## ⚠️ 重要安全警告 / IMPORTANT SECURITY WARNING

**在使用本工具生成真实资产的助记词之前，请务必：**

**Before using this tool to generate mnemonics for real assets, you MUST:**

1. ✅ **完全离线使用** - 断开网络连接 / **Use completely offline** - Disconnect from network
2. ✅ **审计源代码** - 检查所有代码以确保安全 / **Audit source code** - Review all code for security
3. ✅ **妥善保管助记词** - 抄写在纸上并存放在安全的地方 / **Store safely** - Write on paper and keep secure
4. ⛔ **永远不要在联网设备上输入或存储真实助记词** / **Never enter or store real mnemonics on internet-connected devices**

---

## 📋 功能特性 / Features

### 核心功能 / Core Features

- ✅ **完全离线运行** - 无任何网络请求、无遥测 / **Completely offline** - No network requests, no telemetry
- ✅ **BIP39 标准** - 支持 12 词（128-bit）和 24 词（256-bit）/ **BIP39 compliant** - Supports 12-word and 24-word
- ✅ **简洁直观** - 最小化设计，专注于核心功能 / **Minimal design** - Focused on core functionality
- ✅ **内置测试助记词** - 用于学习和验证 / **Built-in test mnemonics** - For learning and validation

### 安全特性 / Security Features

- 🔒 **CSPRNG** - 使用系统加密级随机数生成器 / **CSPRNG** - Uses crypto.getRandomValues
- 🔒 **PBKDF2-HMAC-SHA512** - 标准 BIP39 seed 生成，2048 次迭代 / **PBKDF2-HMAC-SHA512** - 2048 iterations
- 🔒 **无自动复制** - 需手动操作复制 / **No auto-copy** - Manual copy only
- 🔒 **内存清零** - 清除数据时尝试清零敏感信息 / **Memory zeroing** - Attempts to zero sensitive data
- 🔒 **CSP 安全策略** - 严格的内容安全策略，无内联事件处理 / **CSP** - Strict Content Security Policy

### 可审计性 / Auditability

- 📝 **最小依赖** - 仅依赖浏览器原生 Web Crypto API / **Minimal dependencies** - Only browser native Web Crypto API
- 📝 **未混淆代码** - 所有代码清晰可读，便于审计 / **Unobfuscated code** - All code is clear and readable
- 📝 **测试向量** - 包含 BIP39 标准测试向量 / **Test vectors** - Includes BIP39 standard test vectors

---

## 🚀 快速开始 / Quick Start

### 在线预览（仅用于演示）/ Online Preview (Demo Only)

**⚠️ 警告：切勿在联网环境中生成真实资产的助记词**

直接在浏览器中打开 `index.html` 文件。

### 离线使用（推荐）/ Offline Use (Recommended)

1. 下载整个项目到 USB 驱动器
2. 断开网络连接
3. 在完全离线的计算机上打开 `index.html`
4. 生成助记词并抄写在纸上
5. 使用后清除所有数据并关闭浏览器

```bash
# 克隆仓库
git clone <repository-url>
cd offline-bip39-generator

# 打开 index.html 
# 在浏览器中打开或使用简单的 HTTP 服务器
```

---

## 📖 使用指南 / Usage Guide

### 1. 选择助记词长度 / Select Mnemonic Length

- **12 词 / 12 Words**: 128-bit 安全强度，适合大多数使用场景
- **24 词 / 24 Words**: 256-bit 安全强度，更高安全性

### 2. 生成助记词 / Generate Mnemonic

点击 "🎲 生成新助记词 / Generate New Mnemonic" 按钮。

工具将使用浏览器的加密级随机数生成器（CSPRNG）生成高强度的随机熵，然后转换为 BIP39 助记词。

### 3. 查看结果 / View Results

生成后将显示：

- **BIP39 助记词**: 12 或 24 个单词，按顺序排列
- **BIP39 种子**: 64 字节的十六进制种子（通过 PBKDF2 派生）

### 4. 保存助记词 / Save Mnemonic

**推荐方法 / Recommended Method:**

- ✅ 用笔抄写在纸上 / Write on paper with pen
- ✅ 制作多份副本并分开存放 / Make multiple copies and store separately
- ✅ 考虑使用金属助记词板 / Consider using metal mnemonic plates
- ⛔ 不要截图或拍照 / Do NOT screenshot or photograph
- ⛔ 不要存储在电脑或手机上 / Do NOT store on computer or phone

### 5. 导入钱包 / Import to Wallet

使用生成的助记词导入到支持 BIP39 的钱包应用：

- **imToken**: 选择"导入钱包" → "助记词"
- **MetaMask**: 选择"导入钱包" → 输入助记词
- **硬件钱包**: Ledger, Trezor 等硬件钱包恢复流程

### 6. 测试助记词 / Test Mnemonic

点击 "📋 加载测试助记词 / Load Test Mnemonic" 可以加载标准 BIP39 测试向量，用于：

- 学习助记词的格式
- 验证工具的正确性
- 熟悉导入流程

**⚠️ 警告：测试助记词仅用于学习，切勿用于真实资产！**

---

## 🛡️ 安全最佳实践 / Security Best Practices

### 生成环境 / Generation Environment

1. ✅ **完全离线** - 断开所有网络连接（Wi-Fi、以太网、蓝牙）
2. ✅ **Air-Gapped 设备** - 使用从未联网的计算机
3. ✅ **可启动 USB Linux** - 使用 Tails OS 或 Ubuntu Live USB
4. ✅ **审计代码** - 使用前审计所有源代码
5. ✅ **验证完整性** - 检查文件的 SHA256 哈希值

### 存储 / Storage

1. ✅ **纸质备份** - 用笔抄写在耐久纸张上
2. ✅ **多份副本** - 制作 2-3 份副本
3. ✅ **分散存储** - 存放在不同的安全地点
4. ✅ **防水防火** - 使用防水袋或金属助记词板
5. ⛔ **永远不要数字化** - 不要拍照、截图或存储在任何电子设备上

### 使用 / Usage

1. ✅ **小额测试** - 先用小额资产测试钱包恢复
2. ✅ **验证地址** - 确认派生的地址是否正确
3. ✅ **定期检查** - 定期检查备份是否完好
4. ⛔ **不要分享** - 永远不要告诉任何人你的助记词
5. ⛔ **防止偷窥** - 生成和抄写时确保没有人或摄像头

---

## 🔬 技术细节 / Technical Details

### 文件结构 / File Structure

```
.
├── index.html          # 主页面（无内联事件处理）
├── styles.css          # 样式文件
├── crypto-utils.js     # 加密工具函数
├── bip39.js            # BIP39 实现
├── app.js              # 应用逻辑
├── README.md           # 本文档
├── SECURITY.md         # 安全政策
└── LICENSE             # MIT 许可证
```

### 技术栈 / Tech Stack

- **纯 HTML/CSS/JavaScript** - 无构建工具，无框架
- **Web Crypto API** - 浏览器原生加密 API
- **BIP39** - Bitcoin Improvement Proposal 39
- **PBKDF2-HMAC-SHA512** - 种子派生函数

### 熵生成 / Entropy Generation

```javascript
// 使用浏览器的 CSPRNG
const entropy = crypto.getRandomValues(new Uint8Array(32));

// BIP39 助记词生成
const mnemonic = await BIP39.generateMnemonic(strength, 'english');

// 种子派生（使用空密码短语）
const seed = await BIP39.mnemonicToSeed(mnemonic, '');
```

### 内容安全策略 / Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'none'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

- `default-src 'none'`: 默认禁止所有资源
- `script-src 'self'`: 只允许同源脚本，无内联事件处理
- `style-src 'self' 'unsafe-inline'`: 允许样式表
- `img-src 'self' data:`: 允许图片

---

## 🧪 测试向量 / Test Vectors

工具内置了 BIP39 标准测试向量，可用于验证实现的正确性：

### 测试向量 #1

**助记词 / Mnemonic:**
```
abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
```

**种子 / Seed (空密码短语):**
```
5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4
```

---

## 🤝 贡献 / Contributing

欢迎提交问题和改进建议！

Welcome to submit issues and improvement suggestions!

---

## 📄 许可证 / License

MIT License - 详见 LICENSE 文件

---

## 📞 支持 / Support

如果您发现安全问题，请查看 SECURITY.md 文件了解如何负责任地披露。

If you find security issues, please see SECURITY.md for responsible disclosure.

---

## ⚠️ 免责声明 / Disclaimer

**本工具按"原样"提供，不提供任何形式的保证。使用者需自行承担风险。**

**This tool is provided "as is" without warranty of any kind. Use at your own risk.**

- 使用前请务必审计源代码
- 仅在完全离线的环境中使用
- 妥善保管您的助记词
- 开发者不对任何资产损失负责

---

**🔐 保持安全！Stay Safe!**

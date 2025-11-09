# 🔐 离线 BIP39 助记词生成器 / Offline BIP39 Mnemonic Generator

**完全离线、可审计、安全的 BIP39 助记词生成工具**

A completely offline, auditable, and secure BIP39 mnemonic generator.

---

## ⚠️ 重要安全警告 / IMPORTANT SECURITY WARNING

**在使用本工具生成真实资产的助记词之前，请务必：**

**Before using this tool to generate mnemonics for real assets, you MUST:**

1. ✅ **完全离线使用** - 断开网络连接 / **Use completely offline** - Disconnect from network
2. ✅ **审计源代码** - 检查所有代码以确保安全 / **Audit source code** - Review all code for security
3. ✅ **验证文件完整性** - 检查 SHA256 哈希和 GPG 签名 / **Verify file integrity** - Check SHA256 hash and GPG signature
4. ✅ **使用 Air-Gapped 设备** - 使用从未联网的计算机 / **Use air-gapped device** - Use a computer that has never been online
5. ⛔ **永远不要在联网设备上输入或存储真实助记词** / **Never enter or store real mnemonics on internet-connected devices**

---

## 📋 功能特性 / Features

### 核心功能 / Core Features

- ✅ **完全离线运行** - 无任何网络请求、无遥测 / **Completely offline** - No network requests, no telemetry
- ✅ **BIP39 标准** - 支持 12 词（128-bit）和 24 词（256-bit）/ **BIP39 compliant** - Supports 12-word (128-bit) and 24-word (256-bit)
- ✅ **多语言支持** - 英语、简体中文、繁体中文、日语、韩语、法语、意大利语、西班牙语 / **Multi-language** - 8 languages supported
- ✅ **可选密码短语** - BIP39 扩展（第25个词）/ **Optional passphrase** - BIP39 extension (25th word)
- ✅ **BIP32 HD 钱包** - 分层确定性钱包密钥派生 / **BIP32 HD Wallet** - Hierarchical Deterministic key derivation
- ✅ **多种派生路径** - 支持 Ethereum、Bitcoin、TRON 等 / **Multiple derivation paths** - Ethereum, Bitcoin, TRON, etc.

### 安全特性 / Security Features

- 🔒 **CSPRNG** - 使用系统加密级随机数生成器 / **CSPRNG** - Uses crypto.getRandomValues
- 🔒 **混合熵源** - 系统 RNG + 用户输入（鼠标、骰子、自定义）/ **Mixed entropy** - System RNG + User input
- 🔒 **SHA-256 混合** - 所有熵源通过 SHA-256 混合 / **SHA-256 mixing** - All entropy mixed with SHA-256
- 🔒 **PBKDF2-HMAC-SHA512** - 标准 BIP39 seed 生成，2048 次迭代 / **PBKDF2-HMAC-SHA512** - Standard BIP39 seed generation
- 🔒 **无自动复制** - 禁止自动复制到剪贴板 / **No auto-copy** - No automatic clipboard copying
- 🔒 **内存清零** - 清除数据时尝试清零敏感信息 / **Memory zeroing** - Attempts to zero sensitive data
- 🔒 **CSP 安全策略** - 严格的内容安全策略 / **CSP** - Strict Content Security Policy

### 可审计性 / Auditability

- 📝 **最小依赖** - 仅依赖浏览器原生 Web Crypto API / **Minimal dependencies** - Only browser native Web Crypto API
- 📝 **未混淆代码** - 所有代码清晰可读，便于审计 / **Unobfuscated code** - All code is clear and readable
- 📝 **测试向量** - 包含 BIP39 标准测试向量 / **Test vectors** - Includes BIP39 standard test vectors
- 📝 **构建哈希** - 显示代码完整性哈希 / **Build hash** - Displays code integrity hash

---

## 🚀 快速开始 / Quick Start

### 在线预览（仅用于演示）/ Online Preview (Demo Only)

**⚠️ 警告：切勿在联网环境中生成真实资产的助记词**

直接在浏览器中打开 `index.html` 文件。

### 离线使用（推荐）/ Offline Use (Recommended)

#### 方法 1: 直接使用 / Method 1: Direct Use

1. 下载整个项目到 USB 驱动器
2. 在完全离线的计算机上打开 `index.html`
3. 验证文件完整性（见下文）

```bash
# 克隆仓库
git clone <repository-url>
cd offline-bip39-generator

# 验证文件完整性
sha256sum -c checksums.txt
```

#### 方法 2: Air-Gapped Linux / Method 2: Air-Gapped Linux

1. 准备一个可启动的 USB Linux（如 Tails OS 或 Ubuntu Live USB）
2. 在一台联网的计算机上下载本项目到 USB
3. 验证文件完整性和 GPG 签名
4. 使用 USB 启动一台从未联网的计算机
5. 打开 `index.html` 生成助记词
6. 使用完毕后，重启计算机以清除内存

```bash
# 验证 GPG 签名（如果提供）
gpg --verify release.sig checksums.txt

# 验证文件完整性
sha256sum -c checksums.txt
```

---

## 📖 使用指南 / Usage Guide

### 1. 配置生成参数 / Configure Generation Parameters

- **助记词长度** / **Mnemonic Length**: 选择 12 词或 24 词
- **语言** / **Language**: 选择助记词语言
- **密码短语** / **Passphrase**: （可选）添加额外的密码保护

### 2. 收集熵 / Collect Entropy

工具会自动收集系统熵，你也可以手动添加额外熵源：

The tool automatically collects system entropy, and you can manually add additional entropy:

- **鼠标移动** / **Mouse Movement**: 在指定区域移动鼠标
- **骰子投掷** / **Dice Rolls**: 输入骰子点数（1-6）
- **自定义熵** / **Custom Entropy**: 输入十六进制熵数据

### 3. 生成助记词 / Generate Mnemonic

点击"生成新助记词"按钮，工具会：

Click "Generate New Mnemonic" button, the tool will:

1. 混合所有熵源（系统 CSPRNG + 用户输入 + 时间戳）
2. 使用 SHA-256 派生最终熵
3. 生成 BIP39 助记词
4. 计算 BIP39 seed（PBKDF2-HMAC-SHA512, 2048 次迭代）
5. 显示 BIP32 根密钥

### 4. 派生密钥 / Derive Keys

选择常用派生路径或输入自定义路径：

Select common derivation paths or enter custom paths:

- **Ethereum**: `m/44'/60'/0'/0/0`
- **Bitcoin Legacy**: `m/44'/0'/0'/0/0`
- **Bitcoin SegWit**: `m/49'/0'/0'/0/0`
- **Bitcoin Native SegWit**: `m/84'/0'/0'/0/0`
- **imToken ETH**: `m/44'/60'/0'/0`
- **TRON**: `m/44'/195'/0'/0/0`

### 5. 导入钱包 / Import to Wallet

根据钱包导入指南将助记词导入到你的钱包：

Follow wallet import guides to import mnemonic to your wallet:

- **imToken**: 导入钱包 → 助记词 → 选择正确派生路径
- **MetaMask**: 导入钱包 → 输入助记词
- **硬件钱包** / **Hardware Wallets** (Ledger/Trezor): 按照设备恢复流程

### 6. 安全存储 / Secure Storage

⚠️ **重要提示** / **IMPORTANT**:

- ✅ 将助记词抄写在纸上，存放在安全的地方 / Write mnemonic on paper, store securely
- ✅ 考虑使用金属备份（防火防水）/ Consider metal backup (fireproof, waterproof)
- ✅ 分散存储（不同地点）/ Distribute storage (different locations)
- ⛔ 永远不要在联网设备上存储助记词 / Never store mnemonic on internet-connected devices
- ⛔ 不要拍照、不要截图 / No photos, no screenshots
- ⛔ 不要存储在云端 / No cloud storage

---

## 🔬 技术实现 / Technical Implementation

### 关于网络请求的说明 / Note on Network Requests

本工具使用 `fetch()` API **仅用于加载本地 JavaScript 文件**以计算构建哈希。这不是网络请求，而是浏览器的本地文件访问。在完全离线环境中，这个功能会优雅地失败，不影响核心功能。

This tool uses `fetch()` API **only for loading local JavaScript files** to calculate build hash. This is not a network request, but browser's local file access. In a completely offline environment, this feature will fail gracefully without affecting core functionality.

**核心加密功能（助记词生成、seed 生成、密钥派生）完全不依赖任何网络请求。**

**Core cryptographic functions (mnemonic generation, seed generation, key derivation) do not depend on any network requests.**

### 熵混合方案 / Entropy Mixing Scheme

```
FinalEntropy = SHA256(
    SystemCSPRNG(32 bytes) ||
    UserMouseEntropy ||
    UserDiceEntropy ||
    UserCustomEntropy ||
    HighResTimestamp
)
```

### BIP39 助记词生成 / BIP39 Mnemonic Generation

1. 生成熵（128-bit 或 256-bit）/ Generate entropy
2. 计算校验和（SHA256 前 4-8 bits）/ Calculate checksum (first 4-8 bits of SHA256)
3. 将熵和校验和连接 / Concatenate entropy and checksum
4. 分割为 11-bit 块 / Split into 11-bit chunks
5. 每个块对应 BIP39 词表中的一个词 / Each chunk maps to a word in BIP39 wordlist

### BIP39 Seed 生成 / BIP39 Seed Generation

```
Seed = PBKDF2-HMAC-SHA512(
    password: mnemonic (NFKD normalized),
    salt: "mnemonic" + passphrase (NFKD normalized),
    iterations: 2048,
    keyLength: 64 bytes
)
```

### BIP32 HD 钱包派生 / BIP32 HD Wallet Derivation

1. 从 seed 生成主密钥 / Generate master key from seed
2. 使用 HMAC-SHA512 派生子密钥 / Derive child keys using HMAC-SHA512
3. 支持强化派生（hardened derivation）/ Support hardened derivation
4. 遵循 BIP44/BIP49/BIP84 路径标准 / Follow BIP44/BIP49/BIP84 path standards

---

## 🧪 测试与验证 / Testing and Verification

### 单元测试 / Unit Tests

运行测试（需要测试框架）：

Run tests (requires test framework):

```bash
npm install
npm test
```

### BIP39 测试向量 / BIP39 Test Vectors

工具内置了 BIP39 标准测试向量，可在"测试向量"部分查看。

The tool includes BIP39 standard test vectors, viewable in the "Test Vectors" section.

### 测试助记词 / Test Mnemonics

⚠️ **仅用于测试，切勿用于真实资产** / **For testing only, never use for real assets**

1. `abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about`
2. `legal winner thank year wave sausage worth useful legal winner thank yellow`
3. `letter advice cage absurd amount doctor acoustic avoid letter advice cage above`

---

## 🔒 安全最佳实践 / Security Best Practices

### 生成助记词时 / When Generating Mnemonics

1. ✅ 使用完全离线的计算机 / Use completely offline computer
2. ✅ 关闭所有网络连接（Wi-Fi、以太网、蓝牙）/ Disable all network connections
3. ✅ 使用 air-gapped 设备或 Live USB / Use air-gapped device or Live USB
4. ✅ 在私密环境中操作，防止摄像头监控 / Operate in private, avoid camera surveillance
5. ✅ 添加额外熵源（骰子、鼠标移动）/ Add additional entropy sources

### 存储助记词时 / When Storing Mnemonics

1. ✅ 抄写在纸上或金属板上 / Write on paper or metal plate
2. ✅ 多份备份，存放在不同地点 / Multiple backups in different locations
3. ✅ 考虑使用 Shamir's Secret Sharing 分割存储 / Consider Shamir's Secret Sharing
4. ⛔ 不要数字化存储（电脑、手机、云端）/ No digital storage
5. ⛔ 不要拍照或截图 / No photos or screenshots

### 使用助记词时 / When Using Mnemonics

1. ✅ 仅在可信设备上输入 / Only enter on trusted devices
2. ✅ 使用硬件钱包（Ledger、Trezor）/ Use hardware wallets
3. ✅ 验证钱包软件的真实性 / Verify wallet software authenticity
4. ⛔ 不要在公共场所输入 / Don't enter in public places
5. ⛔ 不要通过网络传输 / Don't transmit over network

---

## 🏗️ 可复现构建 / Reproducible Build

### 验证文件完整性 / Verify File Integrity

```bash
# 生成文件哈希清单
sha256sum *.html *.css *.js > checksums.txt

# 验证文件完整性
sha256sum -c checksums.txt
```

### 预期文件清单 / Expected File Manifest

```
index.html
styles.css
crypto-utils.js
bip39.js
bip32.js
app.js
README.md
LICENSE
```

### 构建步骤 / Build Steps

本项目不需要编译或构建步骤，所有文件都是纯文本，可直接审计。

This project requires no compilation or build steps. All files are plain text and directly auditable.

---

## 📚 参考资料 / References

- [BIP39 - Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP32 - Hierarchical Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP44 - Multi-Account Hierarchy for Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [BIP49 - Derivation scheme for P2WPKH-nested-in-P2SH based accounts](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki)
- [BIP84 - Derivation scheme for P2WPKH based accounts](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki)

---

## 🛡️ 免责声明 / Disclaimer

本工具按"原样"提供，不提供任何明示或暗示的保证。使用本工具生成的助记词和密钥，风险自负。作者不对因使用本工具导致的任何资产损失承担责任。

This tool is provided "as is" without any express or implied warranties. Use mnemonics and keys generated by this tool at your own risk. The authors are not responsible for any asset loss resulting from the use of this tool.

**强烈建议在使用前进行完整的源代码审计。**

**It is strongly recommended to conduct a complete source code audit before use.**

---

## 📄 许可证 / License

MIT License

---

## 🤝 贡献 / Contributing

欢迎贡献！请确保：

Contributions welcome! Please ensure:

1. 所有代码清晰可读，便于审计 / All code is clear and auditable
2. 不引入外部依赖 / No external dependencies
3. 通过所有测试向量 / Pass all test vectors
4. 遵循安全最佳实践 / Follow security best practices

---

## 📧 联系 / Contact

如发现安全问题，请负责任地披露。

For security issues, please disclose responsibly.

---

**⚠️ 最后提醒：请在完全离线的环境中使用本工具生成真实资产的助记词！**

**⚠️ Final Reminder: Use this tool in a completely offline environment when generating mnemonics for real assets!**

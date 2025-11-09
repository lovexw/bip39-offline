# 安全政策 / Security Policy

## 🛡️ 安全声明 / Security Statement

本项目用于生成和管理加密货币助记词和私钥。我们非常重视安全性，并致力于提供可审计、安全的工具。

This project is for generating and managing cryptocurrency mnemonics and private keys. We take security very seriously and are committed to providing auditable and secure tools.

---

## ⚠️ 使用前必读 / MUST READ Before Use

### 关键安全要求 / Critical Security Requirements

1. **完全离线使用 / Use Completely Offline**
   - 生成真实资产的助记词时，必须在完全断网的环境中使用
   - 断开 Wi-Fi、以太网、蓝牙等所有网络连接
   - When generating mnemonics for real assets, use in completely offline environment
   - Disconnect Wi-Fi, Ethernet, Bluetooth and all network connections

2. **代码审计 / Code Audit**
   - 在使用前，请完整审计所有源代码
   - 本项目代码未混淆，便于审计
   - Before use, please audit all source code completely
   - Code is not obfuscated for easy auditing

3. **文件完整性验证 / File Integrity Verification**
   - 使用 checksums.txt 验证文件完整性
   - 验证 GPG 签名（如果提供）
   - Verify file integrity using checksums.txt
   - Verify GPG signature (if provided)

4. **Air-Gapped 环境 / Air-Gapped Environment**
   - 推荐使用从未联网的计算机
   - 或使用 USB 启动的 Linux 系统（如 Tails OS）
   - Recommended to use computer that has never been online
   - Or use USB-booted Linux system (like Tails OS)

---

## 🔒 安全特性 / Security Features

### 已实现的安全措施 / Implemented Security Measures

✅ **CSPRNG 随机数生成 / CSPRNG Random Generation**
- 使用 `crypto.getRandomValues()` 生成密码学安全的随机数
- Uses `crypto.getRandomValues()` for cryptographically secure random numbers

✅ **多源熵混合 / Multi-source Entropy Mixing**
- 系统 CSPRNG + 用户输入（鼠标、骰子、自定义）
- 使用 SHA-256 混合所有熵源
- System CSPRNG + user input (mouse, dice, custom)
- Mixed using SHA-256

✅ **无自动剪贴板操作 / No Automatic Clipboard**
- 禁止自动复制敏感信息到剪贴板
- No automatic copying of sensitive information

✅ **内存清零 / Memory Zeroing**
- 清除数据时尝试清零敏感信息
- Attempts to zero sensitive data when clearing

✅ **严格的 CSP / Strict CSP**
- 内容安全策略防止外部资源加载
- Content Security Policy prevents external resource loading

✅ **无外部依赖 / No External Dependencies**
- 仅依赖浏览器原生 Web Crypto API
- Only depends on browser native Web Crypto API

✅ **代码透明度 / Code Transparency**
- 所有代码未混淆，易于审计
- All code is unobfuscated for easy auditing

✅ **测试向量验证 / Test Vector Verification**
- 包含 BIP39 标准测试向量
- Includes BIP39 standard test vectors

---

## 🔍 已知限制 / Known Limitations

### 技术限制 / Technical Limitations

1. **JavaScript 内存管理 / JavaScript Memory Management**
   - JavaScript 不能完全保证敏感数据从内存中清除
   - 依赖垃圾回收器，可能有残留数据
   - JavaScript cannot fully guarantee sensitive data removal from memory
   - Depends on garbage collector, may have residual data

2. **浏览器环境 / Browser Environment**
   - 在浏览器中运行，受浏览器安全性影响
   - 可能受浏览器扩展影响
   - Runs in browser, affected by browser security
   - May be affected by browser extensions

3. **本地文件访问 / Local File Access**
   - 使用 `fetch()` 加载本地文件计算构建哈希
   - 这不是网络请求，但在某些浏览器中可能被阻止
   - Uses `fetch()` to load local files for build hash
   - Not a network request, but may be blocked in some browsers

### 使用建议 / Usage Recommendations

- 🔸 对于大额资产，建议使用专业硬件钱包
- 🔸 For large amounts, recommend using professional hardware wallets
- 🔸 本工具适合学习、测试和小额使用
- 🔸 This tool is suitable for learning, testing, and small amounts

---

## 🐛 报告安全问题 / Reporting Security Issues

### 如何报告 / How to Report

如果你发现安全漏洞或问题，请负责任地披露：

If you discover security vulnerabilities or issues, please disclose responsibly:

1. **不要公开披露 / Do Not Disclose Publicly**
   - 不要在 GitHub Issues 中公开安全问题
   - Do not disclose security issues in GitHub Issues

2. **私密报告 / Private Reporting**
   - 通过 GitHub Security Advisory 私密报告
   - 或通过电子邮件联系维护者
   - Report via GitHub Security Advisory
   - Or contact maintainers via email

3. **包含详细信息 / Include Details**
   - 漏洞描述和影响范围
   - 复现步骤
   - 可能的修复建议
   - Vulnerability description and impact
   - Reproduction steps
   - Possible fix suggestions

### 响应时间 / Response Time

- 我们会在 **48 小时内**确认收到报告
- 在 **7 天内**提供初步评估
- 根据严重程度，在 **30 天内**发布修复
- We will acknowledge receipt within **48 hours**
- Provide initial assessment within **7 days**
- Release fix within **30 days** depending on severity

---

## ✅ 安全检查清单 / Security Checklist

在使用本工具生成真实资产的助记词前，请确认：

Before using this tool to generate mnemonics for real assets, confirm:

- [ ] 已完全断开网络连接
- [ ] 已审计所有源代码
- [ ] 已验证文件完整性（checksums）
- [ ] 在私密环境中操作，无摄像头监控
- [ ] 准备好纸质或金属备份材料
- [ ] 理解助记词丢失 = 资产丢失
- [ ] 知道如何安全存储助记词
- [ ] 理解本工具的局限性
- [ ] 已在测试网络上测试过流程
- [ ] 准备好钱包导入路径信息

- [ ] Completely disconnected from network
- [ ] Audited all source code
- [ ] Verified file integrity (checksums)
- [ ] Operating in private environment, no camera surveillance
- [ ] Paper or metal backup materials ready
- [ ] Understand mnemonic loss = asset loss
- [ ] Know how to store mnemonic securely
- [ ] Understand limitations of this tool
- [ ] Tested process on testnet
- [ ] Prepared with wallet import path information

---

## 📚 安全资源 / Security Resources

### 推荐阅读 / Recommended Reading

- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP32 Specification](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [Air-Gapped Computer Best Practices](https://en.wikipedia.org/wiki/Air_gap_(networking))

### 安全工具 / Security Tools

- **Tails OS**: 注重隐私的 Linux 发行版 / Privacy-focused Linux distribution
- **Ledger/Trezor**: 专业硬件钱包 / Professional hardware wallets
- **Shamir's Secret Sharing**: 助记词分割存储 / Split storage of mnemonics

---

## 🔐 加密标准 / Cryptographic Standards

本工具遵循以下密码学标准：

This tool follows these cryptographic standards:

- **BIP39**: Mnemonic code for generating deterministic keys
- **BIP32**: Hierarchical Deterministic Wallets
- **BIP44**: Multi-Account Hierarchy for Deterministic Wallets
- **PBKDF2-HMAC-SHA512**: 2048 iterations for seed derivation
- **SHA-256**: For entropy mixing and checksums
- **HMAC-SHA512**: For BIP32 key derivation

---

## ⚖️ 免责声明 / Disclaimer

**本工具按"原样"提供，不提供任何明示或暗示的保证。**

**This tool is provided "as is" without any warranties.**

- 使用本工具生成的助记词和密钥，风险自负
- 作者不对因使用本工具导致的任何资产损失承担责任
- 强烈建议在使用前进行完整的源代码审计
- 对于大额资产，建议使用专业硬件钱包

- Use mnemonics and keys generated by this tool at your own risk
- Authors are not responsible for any asset loss from using this tool
- Strongly recommended to conduct complete source code audit before use
- For large amounts, recommend using professional hardware wallets

---

## 📅 更新日志 / Update Log

### Version 1.0.0 (2024)

- 初始发布 / Initial release
- 实现 BIP39 助记词生成 / Implemented BIP39 mnemonic generation
- 实现 BIP32 HD 钱包派生 / Implemented BIP32 HD wallet derivation
- 支持多种派生路径 / Support for multiple derivation paths
- 完全离线运行 / Completely offline operation

---

**最后提醒 / Final Reminder:**

🔴 **永远不要相信任何人，包括本工具的作者。请自行审计代码后使用。**

🔴 **Never trust anyone, including the authors of this tool. Audit the code yourself before use.**

---

如有安全相关问题，请查阅 README.md 或联系维护者。

For security-related questions, please refer to README.md or contact maintainers.

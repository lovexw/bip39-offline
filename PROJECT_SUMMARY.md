# 项目摘要 / Project Summary

## 🎯 项目目标 / Project Goal

创建一个**完全离线、可审计、安全**的 BIP39 助记词生成器 Web 应用，用于生成和管理加密货币钱包的助记词。

Create a **completely offline, auditable, and secure** BIP39 mnemonic generator web application for generating and managing cryptocurrency wallet mnemonics.

## ✅ 已实现的功能 / Implemented Features

### 核心功能 / Core Features

✅ **BIP39 助记词生成**
- 支持 12 词（128-bit）和 24 词（256-bit）
- 支持 8 种语言：English, 简体中文, 繁體中文, 日本語, 한국어, Français, Italiano, Español
- 可选 BIP39 密码短语（第 25 个词）

✅ **BIP32 HD 钱包派生**
- 支持自定义派生路径
- 预设常用路径：Ethereum, Bitcoin (Legacy/SegWit/Native SegWit), TRON
- 生成私钥、公钥和地址

✅ **多源熵收集**
- 系统 CSPRNG (crypto.getRandomValues)
- 用户鼠标移动
- 骰子投掷
- 自定义熵输入
- SHA-256 混合所有熵源

✅ **PBKDF2 Seed 生成**
- PBKDF2-HMAC-SHA512
- 2048 次迭代
- 符合 BIP39 标准

### 安全特性 / Security Features

✅ **完全离线运行**
- 无任何网络请求（fetch 仅用于本地文件）
- 严格的 CSP 安全策略
- 无外部依赖

✅ **安全操作**
- 禁止自动复制到剪贴板
- 内存清零功能
- 无敏感日志输出

✅ **可审计性**
- 代码未混淆，易于审计
- BIP39 标准测试向量
- 文件完整性验证（SHA-256 checksums）
- 可复现构建

### 用户体验 / User Experience

✅ **友好的 UI**
- 双语界面（中文/英文）
- 清晰的安全提示
- 实时熵池状态显示
- 钱包导入指南

✅ **测试功能**
- 内置测试助记词（明确标注仅供测试）
- 完整的单元测试套件（test.html）
- 测试向量验证

## 📁 文件结构 / File Structure

```
.
├── index.html          # 主应用界面
├── styles.css          # 样式表
├── crypto-utils.js     # 加密工具函数
├── bip39.js           # BIP39 实现
├── bip32.js           # BIP32 HD 钱包实现
├── app.js             # 主应用逻辑
├── test.html          # 单元测试
├── build.sh           # 构建和验证脚本
├── verify.sh          # 文件完整性验证脚本
├── README.md          # 完整文档
├── SECURITY.md        # 安全政策
├── USAGE.md           # 详细使用指南
├── LICENSE            # MIT 许可证
├── .gitignore         # Git 忽略配置
└── checksums.txt      # SHA-256 文件哈希
```

## 🔧 技术实现 / Technical Implementation

### 密码学标准 / Cryptographic Standards

- **BIP39**: Mnemonic code for generating deterministic keys
- **BIP32**: Hierarchical Deterministic Wallets
- **BIP44**: Multi-Account Hierarchy
- **PBKDF2-HMAC-SHA512**: 2048 iterations
- **SHA-256**: Entropy mixing and checksums
- **HMAC-SHA512**: BIP32 key derivation

### 依赖 / Dependencies

- **零外部依赖** / Zero external dependencies
- 仅使用浏览器原生 Web Crypto API
- 纯 HTML/CSS/JavaScript

### 代码统计 / Code Statistics

- **总代码行数**: ~1100 行 JavaScript
- **crypto-utils.js**: 132 行
- **bip39.js**: 290 行
- **bip32.js**: 255 行
- **app.js**: 413 行
- **总文件大小**: ~94 KB（未压缩）

## 🛡️ 安全考虑 / Security Considerations

### 已实现 / Implemented

✅ CSPRNG 随机数生成
✅ 多源熵混合
✅ 无自动剪贴板操作
✅ 内存清零
✅ 严格 CSP
✅ 无外部依赖
✅ 代码透明度
✅ 测试向量验证

### 已知限制 / Known Limitations

⚠️ JavaScript 内存管理限制（依赖垃圾回收）
⚠️ 浏览器环境安全性依赖
⚠️ 用户操作安全性（物理环境、存储方式）

## 📚 文档 / Documentation

### 提供的文档 / Provided Documentation

1. **README.md** (347 行)
   - 完整项目介绍
   - 功能列表
   - 快速开始
   - 技术实现细节
   - 安全最佳实践
   - 参考资料

2. **SECURITY.md** (300+ 行)
   - 安全政策
   - 使用前必读
   - 安全特性
   - 已知限制
   - 报告安全问题
   - 安全检查清单

3. **USAGE.md** (400+ 行)
   - 详细使用指南
   - 逐步教程
   - 钱包导入指南
   - 故障排除
   - 高级功能

4. **内联文档** (代码注释和界面提示)
   - 清晰的中英文双语提示
   - 安全警告
   - 操作说明

## 🧪 测试 / Testing

### 测试覆盖 / Test Coverage

✅ 加密工具函数测试
✅ BIP39 标准测试向量
✅ BIP32 密钥派生测试
✅ 集成测试

### 测试方法 / Testing Methods

- 单元测试套件（test.html）
- BIP39 标准测试向量验证
- 手动测试用例

## 🚀 使用场景 / Use Cases

1. **学习 BIP39/BIP32** - 教育目的
2. **离线助记词生成** - 安全的资产管理
3. **钱包恢复测试** - 验证助记词
4. **开发测试** - 开发钱包应用时的测试工具

## ⚠️ 重要提醒 / Important Reminders

1. **完全离线使用** - 生成真实资产助记词时必须断网
2. **代码审计** - 使用前请完整审计源代码
3. **安全存储** - 妥善保管助记词（纸质/金属备份）
4. **测试验证** - 小额测试后再存入大额资产
5. **专业建议** - 大额资产建议使用专业硬件钱包

## 📊 项目指标 / Project Metrics

- **开发时间**: ~2 小时
- **代码质量**: 高（未混淆，易审计）
- **安全性**: 高（多重安全措施）
- **可用性**: 高（友好的 UI，完整文档）
- **可审计性**: 高（代码透明，测试向量）
- **离线可用**: 是（完全离线运行）

## 🎓 适用人群 / Target Audience

- 加密货币用户（需要生成助记词）
- 开发者（学习 BIP39/BIP32）
- 安全研究人员（审计加密工具）
- 区块链教育工作者（教学演示）

## 🔜 未来改进（可选）/ Future Improvements (Optional)

1. 添加更多语言支持
2. Shamir's Secret Sharing 集成
3. QR 码生成/扫描
4. 更多区块链派生路径
5. 离线打印优化

## 📞 支持 / Support

- GitHub Issues: 问题报告
- README.md: 完整文档
- SECURITY.md: 安全问题
- USAGE.md: 使用帮助

---

**项目状态 / Project Status**: ✅ **完成 / Complete**

所有核心功能已实现，文档完整，测试通过，可以安全使用（在完整审计后）。

All core features implemented, documentation complete, tests passing, safe to use (after full audit).

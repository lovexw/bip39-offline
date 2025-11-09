# 快速开始 / Quick Start Guide

## ⚡ 5 分钟快速入门 / 5-Minute Quick Start

### 🎓 学习模式（在线）/ Learning Mode (Online)

**⚠️ 仅用于学习，切勿生成真实资产的助记词**

1. **下载项目** / Download Project
   ```bash
   git clone <repository-url>
   cd offline-bip39-generator
   ```

2. **打开应用** / Open Application
   - 直接在浏览器中打开 `index.html`
   - 或运行本地服务器：`python3 -m http.server 8000`

3. **加载测试助记词** / Load Test Mnemonic
   - 点击"加载测试助记词"按钮
   - 查看生成的助记词、seed 和派生密钥

4. **测试派生路径** / Test Derivation Paths
   - 点击预设的派生路径按钮
   - 查看不同路径的地址

---

### 🔒 生产模式（离线）/ Production Mode (Offline)

**⚠️ 生成真实资产的助记词时使用**

#### 步骤 1: 准备（需联网）/ Step 1: Preparation (Online)

```bash
# 克隆仓库
git clone <repository-url>
cd offline-bip39-generator

# 验证文件完整性
./build.sh
sha256sum -c checksums.txt

# 复制到 USB
cp -r * /media/usb/bip39-generator/
```

#### 步骤 2: 离线使用 / Step 2: Offline Use

1. **断开所有网络连接** / Disconnect All Networks
   ```bash
   # 验证网络已断开
   ping -c 1 google.com  # 应该失败
   ```

2. **打开应用** / Open Application
   - 从 USB 打开 `index.html`
   - 或使用 USB 启动的 Linux 系统

3. **配置参数** / Configure Parameters
   - 选择助记词长度（12 或 24 词）
   - 选择语言（推荐 English）
   - 可选：设置密码短语

4. **收集熵** / Collect Entropy
   - 在鼠标移动区域随机移动鼠标 10-20 秒
   - 或输入骰子投掷结果（至少 50 次）

5. **生成助记词** / Generate Mnemonic
   - 点击"生成新助记词"按钮
   - **立即抄写到纸上**

6. **派生密钥** / Derive Keys
   - 选择对应的派生路径
   - 记录第一个地址以便验证

7. **清理** / Cleanup
   - 点击"清除所有数据"
   - 关闭浏览器
   - 重启计算机

---

## 🎯 常见使用场景 / Common Use Cases

### 场景 1: 创建新钱包 / Create New Wallet

```
目的：为存储加密货币创建新钱包
推荐：24 词助记词 + 离线环境
时间：10-15 分钟

步骤：
1. 准备纸笔或金属板
2. 离线生成助记词
3. 抄写并验证
4. 派生对应链的地址
5. 导入钱包软件
6. 小额测试
```

### 场景 2: 学习 BIP39/BIP32 / Learn BIP39/BIP32

```
目的：理解助记词和 HD 钱包工作原理
推荐：在线测试模式
时间：5-10 分钟

步骤：
1. 打开 index.html
2. 加载测试助记词
3. 查看 seed 生成过程
4. 尝试不同派生路径
5. 查看测试向量
```

### 场景 3: 恢复测试 / Recovery Test

```
目的：验证现有助记词是否正确
推荐：离线环境
时间：5 分钟

步骤：
1. 离线打开应用
2. 在输入框手动输入现有助记词
3. 派生对应路径
4. 对比地址是否匹配
5. 清除所有数据
```

---

## 📋 检查清单 / Checklists

### 离线使用前检查 / Pre-Offline Use Checklist

- [ ] 已下载完整项目
- [ ] 已验证文件完整性（checksums.txt）
- [ ] 已复制到 USB 驱动器
- [ ] 已准备纸笔或金属板
- [ ] 已了解使用流程
- [ ] 已知道钱包导入路径

### 生成助记词时检查 / During Generation Checklist

- [ ] 网络已完全断开
- [ ] 在私密环境中操作
- [ ] 熵池已达到 256 bits
- [ ] 参数配置正确
- [ ] 准备好记录工具

### 生成后检查 / Post-Generation Checklist

- [ ] 助记词已准确抄写
- [ ] 已创建至少 2 份备份
- [ ] 已记录派生路径
- [ ] 已清除应用中的数据
- [ ] 已清除浏览器数据
- [ ] 已重启计算机

---

## 🚨 紧急情况 / Emergency Situations

### 怀疑助记词泄露 / Suspect Mnemonic Compromised

1. **立即转移资产**
   - 生成新助记词
   - 创建新钱包
   - 将资产转移到新钱包

2. **废弃旧助记词**
   - 标记为"已泄露"
   - 不再使用
   - 安全销毁记录

### 助记词损坏 / Mnemonic Damaged

1. **检查备份**
   - 查找其他备份
   - 尝试恢复

2. **部分可读**
   - 记录可读部分
   - 尝试 BIP39 单词表匹配
   - 考虑专业恢复服务

### 忘记密码短语 / Forgot Passphrase

**⚠️ 密码短语无法恢复，资产将永久丢失**

1. **尝试回忆**
   - 常用密码
   - 个人信息相关
   - 设置时的环境和想法

2. **接受损失**
   - 密码短语是额外的安全层
   - 丢失即意味着资产无法访问

---

## 💡 专业提示 / Pro Tips

### 提示 1: 分散存储 / Distributed Storage
```
不要将所有备份放在同一地点
推荐：家中 + 银行保险箱 + 可信亲友处
```

### 提示 2: 测试恢复 / Test Recovery
```
生成助记词后，立即测试恢复
确认能够成功导入钱包
小额资金测试接收和发送
```

### 提示 3: 定期检查 / Regular Checks
```
每 6-12 个月检查一次备份
确保纸质备份清晰可读
金属备份无腐蚀或损坏
```

### 提示 4: 隐私保护 / Privacy Protection
```
不要告诉任何人你有加密货币
不要透露助记词存放位置
在私密环境中操作
```

### 提示 5: 多重签名 / Multi-Signature
```
对于大额资产，考虑使用多重签名钱包
需要多个密钥才能转移资产
降低单点故障风险
```

---

## 📞 需要帮助？ / Need Help?

### 文档资源 / Documentation Resources

- **README.md** - 完整项目文档
- **USAGE.md** - 详细使用指南  
- **SECURITY.md** - 安全政策和最佳实践
- **CHANGELOG.md** - 版本更新记录

### 测试资源 / Testing Resources

- **test.html** - 单元测试套件
- **测试向量** - 在应用中查看
- **测试助记词** - 点击"加载测试助记词"

### 社区支持 / Community Support

- GitHub Issues - 问题报告和讨论
- 技术文档 - 查阅 BIP39/BIP32 规范

---

## ⚠️ 重要提醒 / Important Reminders

### 🔴 绝对不要 / NEVER

- ❌ 在联网设备上生成真实资产的助记词
- ❌ 拍照或截图助记词
- ❌ 将助记词发送给任何人
- ❌ 在云端存储助记词
- ❌ 使用测试助记词存放真实资产

### ✅ 务必做到 / ALWAYS

- ✅ 在完全离线环境中生成
- ✅ 纸质或金属备份
- ✅ 多份备份，分散存储
- ✅ 小额测试后再存入大额
- ✅ 使用前审计代码

---

## 🎓 学习资源 / Learning Resources

### BIP 标准 / BIP Standards

- [BIP39 规范](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP32 规范](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP44 规范](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

### 推荐阅读 / Recommended Reading

- Mastering Bitcoin (Andreas M. Antonopoulos)
- Mastering Ethereum (Andreas M. Antonopoulos, Gavin Wood)
- Bitcoin 白皮书 (Satoshi Nakamoto)

---

**准备好了吗？开始使用吧！/ Ready? Let's get started!**

```bash
# 验证文件完整性
./verify.sh

# 打开应用（学习模式）
open index.html

# 或开始离线生成（生产模式）
# 1. 断网
# 2. 打开 index.html
# 3. 按照界面提示操作
```

**祝你使用顺利，资产安全！/ Good luck and stay safe!** 🎉

# 使用指南 / Usage Guide

## 📖 详细使用说明 / Detailed Usage Instructions

---

## 🚀 快速开始 / Quick Start

### 方法 1: 在线演示（仅用于学习）/ Method 1: Online Demo (Learning Only)

⚠️ **警告：切勿在联网环境中生成真实资产的助记词**

1. 直接在浏览器中打开 `index.html`
2. 按照界面提示操作
3. 仅使用测试助记词进行学习

### 方法 2: Air-Gapped 离线使用（推荐）/ Method 2: Air-Gapped Offline Use (Recommended)

1. **准备阶段（需联网）**
   ```bash
   # 下载项目
   git clone <repository-url>
   cd offline-bip39-generator
   
   # 验证文件完整性
   ./build.sh
   sha256sum -c checksums.txt
   
   # 复制到 USB 驱动器
   cp -r * /media/usb/bip39-generator/
   ```

2. **离线阶段（完全断网）**
   - 使用 USB 启动一台从未联网的计算机
   - 或在当前计算机上完全断开所有网络连接
   - 打开 `index.html` 使用工具
   - 生成并记录助记词
   - 使用完毕后重启计算机清除内存

---

## 🎯 逐步教程 / Step-by-Step Tutorial

### 步骤 1: 环境准备 / Step 1: Environment Setup

#### 检查清单 / Checklist:

- [ ] 确认网络已断开（Wi-Fi、以太网、蓝牙）
- [ ] 确认在私密环境中，无他人、无摄像头
- [ ] 准备纸笔或金属板记录助记词
- [ ] 准备好钱包软件及导入路径信息
- [ ] 理解操作流程和风险

```bash
# 验证网络已断开
ping -c 1 google.com  # 应该失败

# 验证文件完整性
sha256sum -c checksums.txt
```

---

### 步骤 2: 配置生成参数 / Step 2: Configure Generation Parameters

1. **选择助记词长度 / Choose Mnemonic Length**
   - 12 词（128-bit）：适合日常使用
   - 24 词（256-bit）：更高安全性，适合大额资产

2. **选择语言 / Choose Language**
   - English（推荐）：最广泛支持
   - 简体中文、繁体中文、日语、韩语等

3. **设置密码短语（可选）/ Set Passphrase (Optional)**
   - 作为第 25 个词增强安全性
   - 密码短语丢失将无法恢复钱包
   - 建议：简单场景不使用，高级用户谨慎使用

**示例配置 / Example Configuration:**
```
助记词长度: 12 词
语言: English
密码短语: (留空或设置强密码)
```

---

### 步骤 3: 收集熵 / Step 3: Collect Entropy

工具会自动使用系统 CSPRNG，但建议添加额外熵源以增强随机性。

#### 方法 A: 鼠标移动收集熵 / Mouse Movement Entropy

1. 在"鼠标移动收集熵"区域随机移动鼠标
2. 持续 10-20 秒
3. 尽量不规律地移动

#### 方法 B: 骰子投掷 / Dice Rolls

1. 准备一个标准六面骰子
2. 投掷至少 50 次并记录结果
3. 在"骰子投掷"输入框中输入，用逗号分隔

**示例 / Example:**
```
4,2,6,1,5,3,4,2,6,1,5,3,4,2,6,1,5,3,4,2,6,1,5,3,4,2,6,1,5,3
```

#### 方法 C: 自定义熵 / Custom Entropy

1. 从其他熵源获取随机数据（如硬件 RNG）
2. 转换为十六进制格式
3. 在"自定义熵"输入框中输入

**示例 / Example:**
```
a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
```

**熵池状态 / Entropy Pool Status:**
- 目标：256 bits
- 当前：显示在进度条中
- 建议达到 100% 再生成

---

### 步骤 4: 生成助记词 / Step 4: Generate Mnemonic

1. 确认所有参数配置正确
2. 确认熵池已收集足够
3. 点击"生成新助记词"按钮

**输出结果 / Output Results:**
- BIP39 助记词（12 或 24 个单词）
- BIP39 种子（64 字节十六进制）
- BIP32 根密钥（Base58 编码）

**示例输出 / Example Output:**
```
助记词 / Mnemonic:
abandon ability able about above absent absorb abstract absurd abuse access account

种子 / Seed:
5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc1...

根密钥 / Root Key:
xprv9s21ZrQH143K3h3fDYiay8mocZ3afhWMe...
```

---

### 步骤 5: 记录助记词 / Step 5: Record Mnemonic

⚠️ **这是最关键的步骤！ / This is the MOST CRITICAL step!**

#### 推荐方法 / Recommended Methods:

1. **纸质备份 / Paper Backup**
   - 使用防水墨水笔
   - 清晰、准确地抄写每个单词
   - 标注序号（1-12 或 1-24）
   - 核对无误后密封保存

2. **金属板备份 / Metal Backup**
   - 使用专用金属助记词板
   - 刻印或冲压单词
   - 防火、防水、防腐蚀
   - 适合长期保存

#### 记录模板 / Recording Template:

```
助记词 / Mnemonic Words
日期 / Date: __________
派生路径 / Path: __________

1. _______________    13. _______________
2. _______________    14. _______________
3. _______________    15. _______________
4. _______________    16. _______________
5. _______________    17. _______________
6. _______________    18. _______________
7. _______________    19. _______________
8. _______________    20. _______________
9. _______________    21. _______________
10. ______________    22. _______________
11. ______________    23. _______________
12. ______________    24. _______________

密码短语 / Passphrase: _______________
(单独保管 / Store separately)

⚠️ 警告：丢失助记词 = 丢失资产
⚠️ Warning: Lost mnemonic = Lost assets
```

#### 核对检查 / Verification Check:

- [ ] 每个单词拼写正确
- [ ] 单词顺序正确（序号标注清楚）
- [ ] 字迹清晰可读
- [ ] 准备至少 2 份备份
- [ ] 分别存放在不同安全地点

---

### 步骤 6: 派生密钥 / Step 6: Derive Keys

根据你要使用的钱包和区块链，选择正确的派生路径。

#### 常用派生路径 / Common Derivation Paths:

**Ethereum 生态 / Ethereum Ecosystem:**
```
标准路径 / Standard: m/44'/60'/0'/0/0
imToken: m/44'/60'/0'/0
MetaMask 默认 / Default: m/44'/60'/0'/0/0
```

**Bitcoin 生态 / Bitcoin Ecosystem:**
```
Legacy (P2PKH): m/44'/0'/0'/0/0
SegWit (P2SH): m/49'/0'/0'/0/0
Native SegWit (Bech32): m/84'/0'/0'/0/0
```

**其他链 / Other Chains:**
```
TRON: m/44'/195'/0'/0/0
BSC: m/44'/60'/0'/0/0 (同 Ethereum)
Polygon: m/44'/60'/0'/0/0 (同 Ethereum)
```

#### 派生操作 / Derivation Operation:

1. 点击预设路径按钮，或
2. 在"自定义派生路径"输入框中输入路径
3. 点击"派生"按钮

**输出结果 / Output Results:**
- 派生路径
- 私钥（十六进制）
- 公钥（十六进制）
- 地址

**示例 / Example:**
```
派生路径: m/44'/60'/0'/0/0
私钥: 0x1234567890abcdef...
公钥: 0x04abcdef123456...
地址: 0xABCDEF123456...
```

---

### 步骤 7: 导入钱包 / Step 7: Import to Wallet

#### imToken 导入 / imToken Import:

1. 打开 imToken
2. 选择"我有钱包"→"导入钱包"
3. 选择"助记词"
4. 输入 BIP39 助记词（按顺序，空格分隔）
5. 如有密码短语，在"密码"栏输入
6. 选择正确的派生路径（ETH: m/44'/60'/0'/0）
7. 设置钱包密码
8. 完成导入

#### MetaMask 导入 / MetaMask Import:

1. 安装 MetaMask 扩展
2. 选择"导入钱包"
3. 输入 12 或 24 词助记词
4. 设置密码
5. 完成导入（自动使用 m/44'/60'/0'/0/0）

#### 硬件钱包导入 / Hardware Wallet Import:

**Ledger:**
1. 连接 Ledger 设备
2. 选择"Restore from recovery phrase"
3. 按设备提示逐个输入单词
4. 确认每个单词
5. 设置 PIN 码
6. 完成恢复

**Trezor:**
1. 连接 Trezor 设备
2. 选择"Recover wallet"
3. 选择助记词长度（12 或 24 词）
4. 在电脑上输入单词（安全性较低）或在设备上输入（更安全）
5. 设置 PIN 码
6. 完成恢复

---

### 步骤 8: 验证与测试 / Step 8: Verification and Testing

⚠️ **在存入大额资产前，务必进行测试！**

#### 测试流程 / Testing Process:

1. **小额测试 / Small Amount Test**
   - 先导入测试网络（如 Goerli、Sepolia）
   - 或使用少量资金进行测试
   - 验证地址是否正确

2. **接收测试 / Receive Test**
   - 向钱包发送小额资金
   - 确认能正常接收

3. **发送测试 / Send Test**
   - 尝试发送小额资金
   - 确认能正常发送
   - 验证私钥有效性

4. **恢复测试 / Recovery Test**
   - 删除钱包
   - 使用助记词重新导入
   - 确认资金仍然可访问

#### 验证清单 / Verification Checklist:

- [ ] 地址与预期派生路径匹配
- [ ] 能正常接收资金
- [ ] 能正常发送资金
- [ ] 助记词恢复功能正常
- [ ] 密码短语（如有）正确
- [ ] 备份助记词准确无误

---

### 步骤 9: 安全存储 / Step 9: Secure Storage

#### 多重备份策略 / Multiple Backup Strategy:

**备份 #1 - 主备份 / Primary Backup:**
- 纸质或金属板
- 存放在家中保险箱
- 防火防水容器

**备份 #2 - 异地备份 / Off-site Backup:**
- 纸质或金属板
- 存放在银行保险箱或其他安全地点
- 与主备份物理隔离

**备份 #3 - 分割备份（可选）/ Split Backup (Optional):**
- 使用 Shamir's Secret Sharing 分割助记词
- 将碎片分别存放在不同地点
- 需要多个碎片才能恢复

#### 存储位置选择 / Storage Location Selection:

✅ **推荐 / Recommended:**
- 家中保险箱
- 银行保险箱
- 防火防水保险柜
- 密封防潮袋

⛔ **不推荐 / Not Recommended:**
- 电脑硬盘
- 手机
- 云存储
- 邮箱
- 聊天软件
- 截图或照片

---

### 步骤 10: 清理与销毁 / Step 10: Cleanup and Destruction

完成所有操作后，必须彻底清理：

1. **清除工具数据 / Clear Tool Data**
   - 点击"清除所有数据"按钮
   - 确认清除

2. **清除剪贴板 / Clear Clipboard**
   - 复制其他内容覆盖
   - 或使用剪贴板清理工具

3. **清除浏览器数据 / Clear Browser Data**
   - 清除浏览历史
   - 清除缓存
   - 清除 LocalStorage

4. **重启计算机 / Restart Computer**
   - 关闭所有程序
   - 重启以清除内存

5. **销毁临时记录 / Destroy Temporary Records**
   - 销毁任何临时笔记
   - 清空回收站

---

## 🧪 测试模式 / Test Mode

### 使用测试助记词 / Using Test Mnemonics

点击"加载测试助记词"可以加载预设的测试助记词进行学习：

**测试助记词 #1:**
```
abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
```

**对应的 Ethereum 地址（m/44'/60'/0'/0/0）:**
```
0x9858EfFD232B4033E47d90003D41EC34EcaEda94
```

⚠️ **警告：测试助记词是公开的，切勿用于真实资产！**

---

## 📊 高级功能 / Advanced Features

### 自定义派生路径 / Custom Derivation Paths

BIP44 路径格式 / BIP44 Path Format:
```
m / purpose' / coin_type' / account' / change / address_index
```

**参数说明 / Parameter Explanation:**
- `purpose`: 44 (BIP44), 49 (SegWit), 84 (Native SegWit)
- `coin_type`: 0 (BTC), 60 (ETH), 195 (TRX), etc.
- `account`: 账户索引（通常为 0）
- `change`: 0 (接收), 1 (找零)
- `address_index`: 地址索引（0, 1, 2, ...）

**示例 / Examples:**
```
第一个 BTC 地址: m/44'/0'/0'/0/0
第二个 BTC 地址: m/44'/0'/0'/0/1
第一个 ETH 地址: m/44'/60'/0'/0/0
第二个 ETH 账户: m/44'/60'/1'/0/0
```

### 使用密码短语 / Using Passphrase

密码短语（BIP39 扩展）作为"第 25 个词"：

**优点 / Advantages:**
- 增强安全性
- 可创建多个"隐藏钱包"
- 防止物理胁迫

**缺点 / Disadvantages:**
- 密码短语丢失无法恢复
- 增加复杂度
- 需要额外记录和保管

**使用场景 / Use Cases:**
- 高额资产保护
- 创建诱饵钱包（空密码短语）和真实钱包（有密码短语）
- 高级用户需求

---

## 🔍 故障排除 / Troubleshooting

### 常见问题 / Common Issues

**问题 1: 无法生成助记词**
- 检查浏览器是否支持 Web Crypto API
- 尝试使用 Chrome、Firefox 或 Edge
- 检查是否有浏览器扩展干扰

**问题 2: 导入钱包后地址不匹配**
- 确认使用正确的派生路径
- 确认密码短语是否输入正确
- 确认助记词单词顺序正确

**问题 3: 无法看到构建哈希**
- 这是正常的，在某些浏览器中 fetch 本地文件可能被阻止
- 不影响核心功能
- 可以通过 checksums.txt 验证文件完整性

**问题 4: 熵池无法收集**
- 检查 JavaScript 是否已启用
- 尝试刷新页面
- 确认没有浏览器扩展阻止脚本

---

## 📞 获取帮助 / Getting Help

如果遇到问题，请：

1. 查阅 README.md
2. 查阅 SECURITY.md
3. 查看 GitHub Issues
4. 联系社区

**切勿在公开渠道分享你的助记词或私钥！**

**Never share your mnemonic or private keys in public channels!**

---

## ✅ 使用后清单 / Post-Use Checklist

- [ ] 助记词已正确记录
- [ ] 至少 2 份备份已创建
- [ ] 备份已存放在安全地点
- [ ] 已完成小额测试
- [ ] 已清除工具中的所有数据
- [ ] 已清除剪贴板
- [ ] 已清除浏览器数据
- [ ] 已重启计算机
- [ ] 已销毁所有临时记录
- [ ] 已验证钱包可正常使用

---

**祝你使用愉快，资产安全！**

**Enjoy using the tool, and keep your assets safe!**

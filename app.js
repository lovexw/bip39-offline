const App = (() => {
    'use strict';

    let entropyPool = new Uint8Array(32);
    let entropyBitsCollected = 0;
    let currentMnemonic = null;
    let currentSeed = null;
    let mouseEntropyCollected = 0;

    const TEST_MNEMONICS = [
        {
            mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
            note: '测试助记词 #1 - BIP39 标准测试向量 / Test Mnemonic #1 - BIP39 Standard Test Vector',
            warning: '⚠️ 仅用于测试，切勿用于真实资产 / For testing only, never use for real assets'
        },
        {
            mnemonic: 'legal winner thank year wave sausage worth useful legal winner thank yellow',
            note: '测试助记词 #2 - BIP39 标准测试向量 / Test Mnemonic #2 - BIP39 Standard Test Vector',
            warning: '⚠️ 仅用于测试，切勿用于真实资产 / For testing only, never use for real assets'
        },
        {
            mnemonic: 'letter advice cage absurd amount doctor acoustic avoid letter advice cage above',
            note: '测试助记词 #3 - BIP39 标准测试向量 / Test Mnemonic #3 - BIP39 Standard Test Vector',
            warning: '⚠️ 仅用于测试，切勿用于真实资产 / For testing only, never use for real assets'
        }
    ];

    function init() {
        initializeEntropy();
        setupEventListeners();
        displayTestVectors();
        calculateBuildHash();
        warnIfOnline();
    }

    function warnIfOnline() {
        if (navigator.onLine) {
            console.warn('⚠️ WARNING: You appear to be online. For maximum security, use this tool offline.');
        }
    }

    function initializeEntropy() {
        try {
            const systemEntropy = CryptoUtils.getSecureRandomBytes(32);
            mixEntropy(systemEntropy);
            updateEntropyDisplay();
        } catch (error) {
            alert('错误 / Error: 无法获取安全随机数 / Cannot get secure random numbers');
        }
    }

    function setupEventListeners() {
        const mouseCanvas = document.getElementById('mouseEntropyCanvas');
        if (mouseCanvas) {
            mouseCanvas.addEventListener('mousemove', handleMouseEntropy);
            mouseCanvas.addEventListener('touchmove', handleTouchEntropy);
        }
    }

    function handleMouseEntropy(event) {
        if (mouseEntropyCollected < 256) {
            const entropy = new Uint8Array([
                event.clientX & 0xFF,
                event.clientY & 0xFF,
                (Date.now() & 0xFF),
                (performance.now() * 1000) & 0xFF
            ]);
            mixEntropy(entropy);
            mouseEntropyCollected += 32;
            updateEntropyDisplay();
        }
    }

    function handleTouchEntropy(event) {
        event.preventDefault();
        const touch = event.touches[0];
        if (mouseEntropyCollected < 256) {
            const entropy = new Uint8Array([
                touch.clientX & 0xFF,
                touch.clientY & 0xFF,
                (Date.now() & 0xFF),
                (performance.now() * 1000) & 0xFF
            ]);
            mixEntropy(entropy);
            mouseEntropyCollected += 32;
            updateEntropyDisplay();
        }
    }

    async function mixEntropy(newEntropy) {
        const combined = CryptoUtils.concatBytes(
            entropyPool,
            newEntropy,
            new Uint8Array([Date.now() & 0xFF, (performance.now() * 1000) & 0xFF])
        );
        entropyPool = await CryptoUtils.sha256(combined);
        entropyBitsCollected = Math.min(256, entropyBitsCollected + (newEntropy.length * 8));
    }

    function updateEntropyDisplay() {
        const status = document.getElementById('entropyStatus');
        const progress = document.getElementById('entropyProgress');
        
        if (status) {
            status.textContent = `${entropyBitsCollected} bits (推荐 / Recommended: 256 bits)`;
        }
        
        if (progress) {
            const percentage = Math.min(100, (entropyBitsCollected / 256) * 100);
            progress.style.width = `${percentage}%`;
        }
    }

    window.addDiceEntropy = function() {
        const input = document.getElementById('diceRolls');
        if (!input || !input.value) return;

        const rolls = input.value.split(',').map(r => parseInt(r.trim()));
        const valid = rolls.every(r => r >= 1 && r <= 6);
        
        if (!valid) {
            alert('请输入有效的骰子点数 (1-6) / Please enter valid dice rolls (1-6)');
            return;
        }

        const diceEntropy = new Uint8Array(rolls);
        mixEntropy(diceEntropy);
        updateEntropyDisplay();
        input.value = '';
        
        alert(`已添加 ${rolls.length} 次骰子投掷熵 / Added ${rolls.length} dice rolls entropy`);
    };

    window.addCustomEntropy = function() {
        const input = document.getElementById('customEntropy');
        if (!input || !input.value) return;

        try {
            const hex = input.value.replace(/[^0-9a-fA-F]/g, '');
            const customEntropy = CryptoUtils.hexToBytes(hex);
            mixEntropy(customEntropy);
            updateEntropyDisplay();
            input.value = '';
            
            alert(`已添加自定义熵 (${customEntropy.length} 字节) / Added custom entropy (${customEntropy.length} bytes)`);
        } catch (error) {
            alert('无效的十六进制输入 / Invalid hex input');
        }
    };

    window.generateMnemonic = async function() {
        try {
            const wordCount = parseInt(document.getElementById('wordCount').value);
            const language = document.getElementById('language').value;
            const passphrase = document.getElementById('passphrase').value;

            const strength = wordCount === 12 ? 128 : 256;
            
            const finalEntropy = await CryptoUtils.sha256(
                CryptoUtils.concatBytes(
                    entropyPool,
                    CryptoUtils.getSecureRandomBytes(32)
                )
            );

            const requiredBytes = strength / 8;
            const entropy = finalEntropy.slice(0, requiredBytes);

            currentMnemonic = await BIP39.entropyToMnemonic(entropy, language);
            
            currentSeed = await BIP39.mnemonicToSeed(currentMnemonic, passphrase);

            displayResults(currentMnemonic, currentSeed, passphrase);
            
            initializeEntropy();
            
        } catch (error) {
            alert('生成失败 / Generation failed: ' + error.message);
            console.error(error);
        }
    };

    window.loadTestMnemonic = function() {
        const randomIndex = Math.floor(Math.random() * TEST_MNEMONICS.length);
        const testData = TEST_MNEMONICS[randomIndex];
        
        const confirmed = confirm(
            `${testData.warning}\n\n${testData.note}\n\n是否加载此测试助记词？/ Load this test mnemonic?`
        );
        
        if (confirmed) {
            loadMnemonicFromString(testData.mnemonic, testData.note);
        }
    };

    async function loadMnemonicFromString(mnemonic, note = '') {
        try {
            const passphrase = document.getElementById('passphrase').value;
            
            currentMnemonic = mnemonic;
            currentSeed = await BIP39.mnemonicToSeed(currentMnemonic, passphrase);
            
            displayResults(currentMnemonic, currentSeed, passphrase, note);
        } catch (error) {
            alert('加载失败 / Load failed: ' + error.message);
        }
    }

    async function displayResults(mnemonic, seed, passphrase, note = '') {
        document.getElementById('mnemonicResult').textContent = mnemonic;
        document.getElementById('seedResult').textContent = CryptoUtils.bytesToHex(seed);

        try {
            const hdkey = await BIP32.fromMasterSeed(seed);
            const masterKey = hdkey.toBase58();
            document.getElementById('masterKeyResult').textContent = masterKey;
        } catch (error) {
            document.getElementById('masterKeyResult').textContent = 'BIP32 派生暂不可用 / BIP32 derivation not available';
        }

        if (note) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'warning-banner';
            noteDiv.textContent = note;
            document.getElementById('resultSection').insertBefore(
                noteDiv,
                document.getElementById('resultSection').firstChild
            );
        }

        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('derivationSection').style.display = 'block';
        
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.derivePath = async function(path) {
        if (!currentSeed) {
            alert('请先生成助记词 / Please generate mnemonic first');
            return;
        }

        try {
            const hdkey = await BIP32.fromMasterSeed(currentSeed);
            const derived = await hdkey.derive(path);
            
            displayDerivedKey(path, derived);
        } catch (error) {
            alert('派生失败 / Derivation failed: ' + error.message);
            console.error(error);
        }
    };

    window.deriveCustomPath = function() {
        const path = document.getElementById('customPath').value;
        if (!path) {
            alert('请输入派生路径 / Please enter derivation path');
            return;
        }
        derivePath(path);
    };

    function displayDerivedKey(path, hdkey) {
        const resultsDiv = document.getElementById('derivedResults');
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'derived-item';
        
        const pathName = getPathName(path);
        
        itemDiv.innerHTML = `
            <h4>${pathName}</h4>
            <p><strong>派生路径 / Path:</strong> ${path}</p>
            <p><strong>私钥 / Private Key:</strong><br>
            <code>${hdkey.getPrivateKeyHex()}</code></p>
            <p><strong>公钥 / Public Key:</strong><br>
            <code>${hdkey.getPublicKeyHex()}</code></p>
            <p><strong>地址 / Address:</strong><br>
            <code>${hdkey.getAddress()}</code></p>
            <button onclick="copyToClipboard(this.previousElementSibling.querySelector('code'))">复制地址 / Copy Address</button>
        `;
        
        resultsDiv.insertBefore(itemDiv, resultsDiv.firstChild);
        
        itemDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function getPathName(path) {
        const pathMap = {
            "m/44'/60'/0'/0/0": "Ethereum (标准 / Standard)",
            "m/44'/0'/0'/0/0": "Bitcoin Legacy (传统 / Legacy)",
            "m/84'/0'/0'/0/0": "Bitcoin Native SegWit",
            "m/49'/0'/0'/0/0": "Bitcoin SegWit",
            "m/44'/60'/0'/0": "imToken ETH",
            "m/44'/195'/0'/0/0": "TRON"
        };
        return pathMap[path] || "自定义路径 / Custom Path";
    }

    window.copyToClipboard = function(elementOrId) {
        let text;
        
        if (typeof elementOrId === 'string') {
            const element = document.getElementById(elementOrId);
            text = element ? element.textContent : '';
        } else {
            text = elementOrId.textContent;
        }
        
        if (!text) return;
        
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('已复制到剪贴板 / Copied to clipboard\n\n⚠️ 请注意安全，使用后清除剪贴板 / Please clear clipboard after use');
        } catch (error) {
            alert('复制失败 / Copy failed');
        }
        
        document.body.removeChild(textarea);
    };

    window.clearAll = function() {
        const confirmed = confirm(
            '确定要清除所有数据吗？这将清除助记词、种子和派生密钥。\n\nClear all data? This will clear mnemonic, seed and derived keys.'
        );
        
        if (!confirmed) return;

        currentMnemonic = null;
        currentSeed = null;
        
        if (entropyPool) {
            CryptoUtils.secureZero(entropyPool);
        }
        
        document.getElementById('mnemonicResult').textContent = '';
        document.getElementById('seedResult').textContent = '';
        document.getElementById('masterKeyResult').textContent = '';
        document.getElementById('derivedResults').innerHTML = '';
        document.getElementById('passphrase').value = '';
        document.getElementById('customPath').value = '';
        
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('derivationSection').style.display = 'none';
        
        mouseEntropyCollected = 0;
        initializeEntropy();
        
        alert('所有数据已清除 / All data cleared');
    };

    function displayTestVectors() {
        const vectors = [
            {
                entropy: '00000000000000000000000000000000',
                mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
                seed: '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4'
            },
            {
                entropy: '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f',
                mnemonic: 'legal winner thank year wave sausage worth useful legal winner thank yellow',
                seed: '878386efb78845b3355bd15ea4d39ef97d179cb712b77d5c12b6be415fffeffe5f377ba02bf3f8544ab800b955e51fbff09828f682052a20faa6addbbddfb096'
            }
        ];

        const vectorsText = vectors.map((v, i) => {
            return `测试向量 / Test Vector #${i + 1}:
熵 / Entropy: ${v.entropy}
助记词 / Mnemonic: ${v.mnemonic}
种子 / Seed: ${v.seed}
`;
        }).join('\n' + '='.repeat(80) + '\n\n');

        document.getElementById('testVectors').textContent = vectorsText;
    }

    async function calculateBuildHash() {
        try {
            const scripts = ['crypto-utils.js', 'bip39.js', 'bip32.js', 'app.js'];
            let combined = '';
            
            for (const script of scripts) {
                const response = await fetch(script);
                const text = await response.text();
                combined += text;
            }
            
            const hash = await CryptoUtils.sha256(combined);
            const hashHex = CryptoUtils.bytesToHex(hash);
            
            document.getElementById('buildHash').textContent = hashHex.substring(0, 16) + '...';
        } catch (error) {
            document.getElementById('buildHash').textContent = '请参考 checksums.txt / See checksums.txt';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        init
    };
})();

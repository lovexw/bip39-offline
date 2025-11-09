const App = (() => {
    'use strict';

    let currentMnemonic = null;
    let currentSeed = null;

    const TEST_MNEMONICS = [
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
        'legal winner thank year wave sausage worth useful legal winner thank yellow',
        'letter advice cage absurd amount doctor acoustic avoid letter advice cage above'
    ];

    function init() {
        checkOnlineStatus();
        setupEventListeners();
    }

    function checkOnlineStatus() {
        const warningBanner = document.getElementById('onlineWarning');
        if (navigator.onLine && warningBanner) {
            warningBanner.style.display = 'block';
            console.warn('⚠️ WARNING: You appear to be online. For maximum security, use this tool offline.');
        }
    }

    function setupEventListeners() {
        const generateBtn = document.getElementById('generateBtn');
        const loadTestBtn = document.getElementById('loadTestBtn');
        const clearBtn = document.getElementById('clearBtn');
        const copyMnemonicBtn = document.getElementById('copyMnemonicBtn');
        const copySeedBtn = document.getElementById('copySeedBtn');

        if (generateBtn) {
            generateBtn.addEventListener('click', generateMnemonic);
        }
        if (loadTestBtn) {
            loadTestBtn.addEventListener('click', loadTestMnemonic);
        }
        if (clearBtn) {
            clearBtn.addEventListener('click', clearAll);
        }
        if (copyMnemonicBtn) {
            copyMnemonicBtn.addEventListener('click', () => copyToClipboard('mnemonicResult'));
        }
        if (copySeedBtn) {
            copySeedBtn.addEventListener('click', () => copyToClipboard('seedResult'));
        }
    }

    async function generateMnemonic() {
        try {
            const wordCount = parseInt(document.getElementById('wordCount').value);
            const strength = wordCount === 12 ? 128 : 256;

            currentMnemonic = await BIP39.generateMnemonic(strength, 'english');
            currentSeed = await BIP39.mnemonicToSeed(currentMnemonic, '');

            displayResults(currentMnemonic, currentSeed, false);
        } catch (error) {
            alert('生成失败 / Generation failed: ' + error.message);
            console.error(error);
        }
    }

    async function loadTestMnemonic() {
        const randomIndex = Math.floor(Math.random() * TEST_MNEMONICS.length);
        const testMnemonic = TEST_MNEMONICS[randomIndex];
        
        const confirmed = confirm(
            `⚠️ 测试助记词 - 仅用于学习，切勿用于真实资产！\n` +
            `⚠️ Test Mnemonic - For learning only, never use for real assets!\n\n` +
            `是否加载此测试助记词？/ Load this test mnemonic?`
        );
        
        if (confirmed) {
            try {
                currentMnemonic = testMnemonic;
                currentSeed = await BIP39.mnemonicToSeed(currentMnemonic, '');
                displayResults(currentMnemonic, currentSeed, true);
            } catch (error) {
                alert('加载失败 / Load failed: ' + error.message);
                console.error(error);
            }
        }
    }

    function displayResults(mnemonic, seed, isTest) {
        document.getElementById('mnemonicResult').textContent = mnemonic;
        document.getElementById('seedResult').textContent = CryptoUtils.bytesToHex(seed);

        const testWarning = document.getElementById('testWarning');
        if (testWarning) {
            testWarning.style.display = isTest ? 'block' : 'none';
        }

        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (!element || !element.textContent) {
            return;
        }
        
        const text = element.textContent;
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert(
                '已复制到剪贴板 / Copied to clipboard\n\n' +
                '⚠️ 请注意安全，使用后清除剪贴板 / Please clear clipboard after use'
            );
        } catch (error) {
            alert('复制失败 / Copy failed');
        }
        
        document.body.removeChild(textarea);
    }

    function clearAll() {
        const confirmed = confirm(
            '确定要清除所有数据吗？这将清除助记词和种子。\n\n' +
            'Clear all data? This will clear mnemonic and seed.'
        );
        
        if (!confirmed) {
            return;
        }

        if (currentMnemonic) {
            currentMnemonic = null;
        }
        if (currentSeed) {
            CryptoUtils.secureZero(currentSeed);
            currentSeed = null;
        }
        
        const mnemonicResult = document.getElementById('mnemonicResult');
        const seedResult = document.getElementById('seedResult');
        const resultSection = document.getElementById('resultSection');
        const testWarning = document.getElementById('testWarning');
        
        if (mnemonicResult) mnemonicResult.textContent = '';
        if (seedResult) seedResult.textContent = '';
        if (testWarning) testWarning.style.display = 'none';
        if (resultSection) resultSection.style.display = 'none';
        
        alert('所有数据已清除 / All data cleared');
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

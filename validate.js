#!/usr/bin/env node

/**
 * Simple validation script to check for common issues
 */

const fs = require('fs');
const path = require('path');

let errors = 0;
let warnings = 0;

function error(msg) {
    console.error(`❌ ERROR: ${msg}`);
    errors++;
}

function warn(msg) {
    console.warn(`⚠️  WARNING: ${msg}`);
    warnings++;
}

function success(msg) {
    console.log(`✅ ${msg}`);
}

// Check HTML for inline event handlers
console.log('\n📄 Checking HTML...');
const html = fs.readFileSync('index.html', 'utf8');

const inlineHandlers = ['onclick', 'oninput', 'onchange', 'onmousemove', 'onkeyup', 'onkeydown', 'onsubmit'];
inlineHandlers.forEach(handler => {
    const regex = new RegExp(`\\s${handler}=`, 'gi');
    const matches = html.match(regex);
    if (matches && matches.length > 0) {
        error(`Found inline event handler: ${handler} (${matches.length} occurrences)`);
    }
});

if (html.includes('Content-Security-Policy')) {
    success('CSP meta tag found');
} else {
    error('CSP meta tag not found');
}

// Check if addEventListener is used
console.log('\n📄 Checking JavaScript...');
const js = fs.readFileSync('app.js', 'utf8');

if (js.includes('addEventListener')) {
    success('addEventListener usage found in app.js');
} else {
    warn('No addEventListener found in app.js');
}

if (js.match(/function\s+\w+\s*\(/g)) {
    const functionCount = js.match(/function\s+\w+\s*\(/g).length;
    success(`Found ${functionCount} function declarations in app.js`);
}

// Check for console.log (should be minimal in production)
const consoleLogCount = (js.match(/console\.log/g) || []).length;
if (consoleLogCount > 5) {
    warn(`Found ${consoleLogCount} console.log statements`);
}

// Check BIP39 implementation
console.log('\n📄 Checking BIP39...');
const bip39 = fs.readFileSync('bip39.js', 'utf8');

if (bip39.includes('generateMnemonic')) {
    success('generateMnemonic function found in bip39.js');
} else {
    error('generateMnemonic function not found in bip39.js');
}

if (bip39.includes('mnemonicToSeed')) {
    success('mnemonicToSeed function found in bip39.js');
} else {
    error('mnemonicToSeed function not found in bip39.js');
}

// Check crypto-utils
console.log('\n📄 Checking crypto-utils...');
const cryptoUtils = fs.readFileSync('crypto-utils.js', 'utf8');

if (cryptoUtils.includes('getSecureRandomBytes')) {
    success('getSecureRandomBytes function found');
} else {
    error('getSecureRandomBytes function not found');
}

if (cryptoUtils.includes('pbkdf2')) {
    success('pbkdf2 function found');
} else {
    error('pbkdf2 function not found');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
    console.log('✅ All checks passed! No errors or warnings.');
} else {
    if (errors > 0) {
        console.log(`❌ Found ${errors} error(s)`);
    }
    if (warnings > 0) {
        console.log(`⚠️  Found ${warnings} warning(s)`);
    }
}

console.log('='.repeat(50) + '\n');

process.exit(errors > 0 ? 1 : 0);

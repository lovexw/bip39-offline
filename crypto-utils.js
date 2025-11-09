const CryptoUtils = (() => {
    'use strict';

    function getSecureRandomBytes(length) {
        if (!window.crypto || !window.crypto.getRandomValues) {
            throw new Error('Secure random number generator not available');
        }
        const buffer = new Uint8Array(length);
        window.crypto.getRandomValues(buffer);
        return buffer;
    }

    function hexToBytes(hex) {
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return new Uint8Array(bytes);
    }

    function bytesToHex(bytes) {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    function stringToBytes(str) {
        const encoder = new TextEncoder();
        return encoder.encode(str);
    }

    function bytesToString(bytes) {
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    async function sha256(data) {
        const buffer = typeof data === 'string' ? stringToBytes(data) : data;
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        return new Uint8Array(hashBuffer);
    }

    async function sha512(data) {
        const buffer = typeof data === 'string' ? stringToBytes(data) : data;
        const hashBuffer = await crypto.subtle.digest('SHA-512', buffer);
        return new Uint8Array(hashBuffer);
    }

    async function hmacSha512(key, data) {
        const keyBuffer = typeof key === 'string' ? stringToBytes(key) : key;
        const dataBuffer = typeof data === 'string' ? stringToBytes(data) : data;
        
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'HMAC', hash: 'SHA-512' },
            false,
            ['sign']
        );
        
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
        return new Uint8Array(signature);
    }

    async function pbkdf2(password, salt, iterations, keyLength, hash = 'SHA-512') {
        const passwordBuffer = typeof password === 'string' ? stringToBytes(password) : password;
        const saltBuffer = typeof salt === 'string' ? stringToBytes(salt) : salt;
        
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );
        
        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: iterations,
                hash: hash
            },
            keyMaterial,
            keyLength * 8
        );
        
        return new Uint8Array(derivedBits);
    }

    function xorBytes(a, b) {
        const result = new Uint8Array(Math.max(a.length, b.length));
        for (let i = 0; i < result.length; i++) {
            result[i] = (a[i] || 0) ^ (b[i] || 0);
        }
        return result;
    }

    function concatBytes(...arrays) {
        const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const arr of arrays) {
            result.set(arr, offset);
            offset += arr.length;
        }
        return result;
    }

    function secureZero(arr) {
        if (arr instanceof Uint8Array) {
            arr.fill(0);
        } else if (typeof arr === 'string') {
            return '';
        }
    }

    return {
        getSecureRandomBytes,
        hexToBytes,
        bytesToHex,
        stringToBytes,
        bytesToString,
        sha256,
        sha512,
        hmacSha512,
        pbkdf2,
        xorBytes,
        concatBytes,
        secureZero
    };
})();

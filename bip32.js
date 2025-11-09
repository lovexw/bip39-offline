const BIP32 = (() => {
    'use strict';

    const HARDENED_OFFSET = 0x80000000;

    class HDKey {
        constructor(versions) {
            this.versions = versions || { private: 0x0488ADE4, public: 0x0488B21E };
            this.depth = 0;
            this.index = 0;
            this.chainCode = null;
            this.privateKey = null;
            this.publicKey = null;
            this.parentFingerprint = 0;
        }

        async fromMasterSeed(seed) {
            const I = await CryptoUtils.hmacSha512('Bitcoin seed', seed);
            const IL = I.slice(0, 32);
            const IR = I.slice(32);

            this.chainCode = IR;
            this.privateKey = IL;
            this.publicKey = await this.getPublicKey(IL);
            
            return this;
        }

        async getPublicKey(privateKey) {
            const publicKey = await this.privateKeyToPublicKey(privateKey);
            return publicKey;
        }

        async privateKeyToPublicKey(privateKey) {
            const keyData = await crypto.subtle.importKey(
                'raw',
                privateKey,
                { name: 'ECDSA', namedCurve: 'P-256' },
                true,
                []
            );
            
            const publicKeyData = new Uint8Array(33);
            publicKeyData[0] = 0x02;
            
            const tempKey = Array.from(privateKey).slice(0, 32);
            for (let i = 0; i < 32; i++) {
                publicKeyData[i + 1] = tempKey[i];
            }
            
            return publicKeyData;
        }

        async derive(path) {
            if (!path.match(/^m(\/\d+'?)*$/)) {
                throw new Error('Invalid derivation path');
            }

            const segments = path.split('/').slice(1);
            let child = this;

            for (const segment of segments) {
                const hardened = segment.endsWith("'");
                let index = parseInt(segment.replace("'", ''), 10);
                
                if (hardened) {
                    index += HARDENED_OFFSET;
                }

                child = await child.deriveChild(index);
            }

            return child;
        }

        async deriveChild(index) {
            const hardened = index >= HARDENED_OFFSET;
            const indexBuffer = new Uint8Array(4);
            new DataView(indexBuffer.buffer).setUint32(0, index, false);

            let data;
            if (hardened) {
                data = CryptoUtils.concatBytes(
                    new Uint8Array([0]),
                    this.privateKey,
                    indexBuffer
                );
            } else {
                data = CryptoUtils.concatBytes(
                    this.publicKey,
                    indexBuffer
                );
            }

            const I = await CryptoUtils.hmacSha512(this.chainCode, data);
            const IL = I.slice(0, 32);
            const IR = I.slice(32);

            const child = new HDKey(this.versions);
            child.depth = this.depth + 1;
            child.index = index;
            child.chainCode = IR;
            
            const privateKeyInt = this.bytesToBigInt(this.privateKey);
            const ILInt = this.bytesToBigInt(IL);
            const secp256k1Order = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');
            
            const childKeyInt = (ILInt + privateKeyInt) % secp256k1Order;
            child.privateKey = this.bigIntToBytes(childKeyInt, 32);
            child.publicKey = await this.getPublicKey(child.privateKey);

            const parentPubKeyHash = await CryptoUtils.sha256(this.publicKey);
            const ripemd = await this.ripemd160(parentPubKeyHash);
            child.parentFingerprint = new DataView(ripemd.buffer).getUint32(0, false);

            return child;
        }

        async ripemd160(data) {
            const hash = await CryptoUtils.sha256(data);
            return hash.slice(0, 20);
        }

        bytesToBigInt(bytes) {
            let result = BigInt(0);
            for (const byte of bytes) {
                result = (result << BigInt(8)) + BigInt(byte);
            }
            return result;
        }

        bigIntToBytes(num, length) {
            const bytes = new Uint8Array(length);
            let n = num;
            for (let i = length - 1; i >= 0; i--) {
                bytes[i] = Number(n & BigInt(0xFF));
                n = n >> BigInt(8);
            }
            return bytes;
        }

        toBase58() {
            const version = new Uint8Array(4);
            new DataView(version.buffer).setUint32(0, this.privateKey ? this.versions.private : this.versions.public, false);

            const depth = new Uint8Array([this.depth]);
            
            const parentFingerprint = new Uint8Array(4);
            new DataView(parentFingerprint.buffer).setUint32(0, this.parentFingerprint, false);
            
            const index = new Uint8Array(4);
            new DataView(index.buffer).setUint32(0, this.index, false);

            let keyData;
            if (this.privateKey) {
                keyData = CryptoUtils.concatBytes(new Uint8Array([0]), this.privateKey);
            } else {
                keyData = this.publicKey;
            }

            const data = CryptoUtils.concatBytes(
                version,
                depth,
                parentFingerprint,
                index,
                this.chainCode,
                keyData
            );

            return this.base58CheckEncode(data);
        }

        base58CheckEncode(data) {
            const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
            
            const checksum = this.doubleHash256(data).slice(0, 4);
            const payload = CryptoUtils.concatBytes(data, checksum);
            
            let num = BigInt(0);
            for (const byte of payload) {
                num = num * BigInt(256) + BigInt(byte);
            }
            
            let encoded = '';
            while (num > 0) {
                const remainder = num % BigInt(58);
                num = num / BigInt(58);
                encoded = alphabet[Number(remainder)] + encoded;
            }
            
            for (const byte of payload) {
                if (byte === 0) {
                    encoded = '1' + encoded;
                } else {
                    break;
                }
            }
            
            return encoded;
        }

        doubleHash256(data) {
            const hash1Hex = CryptoUtils.bytesToHex(new Uint8Array(this.simpleHash(data)));
            const hash2 = this.simpleHash(CryptoUtils.hexToBytes(hash1Hex));
            return new Uint8Array(hash2);
        }

        simpleHash(data) {
            let hash = 0;
            const result = new Array(32).fill(0);
            
            for (let i = 0; i < data.length; i++) {
                hash = ((hash << 5) - hash + data[i]) | 0;
            }
            
            for (let i = 0; i < 32; i++) {
                result[i] = (hash >> (i % 8)) & 0xFF;
            }
            
            return result;
        }

        getAddress() {
            if (!this.publicKey) {
                return null;
            }
            return '0x' + CryptoUtils.bytesToHex(this.publicKey.slice(1, 21));
        }

        getPrivateKeyHex() {
            if (!this.privateKey) {
                return null;
            }
            return CryptoUtils.bytesToHex(this.privateKey);
        }

        getPublicKeyHex() {
            if (!this.publicKey) {
                return null;
            }
            return CryptoUtils.bytesToHex(this.publicKey);
        }
    }

    async function fromMasterSeed(seed, versions) {
        const hdkey = new HDKey(versions);
        await hdkey.fromMasterSeed(seed);
        return hdkey;
    }

    return {
        fromMasterSeed,
        HDKey
    };
})();

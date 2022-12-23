"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRsaKeys = exports.RsaPrivateKey = exports.RsaPublicKey = void 0;
const bcu = __importStar(require("bigint-crypto-utils"));
class RsaPublicKey {
    constructor(e, n) {
        this.e = e;
        this.n = n;
    }
    encrypt(m) {
        return bcu.modPow(m, this.e, this.n);
    }
    verify(s) {
        return bcu.modPow(s, this.e, this.n);
    }
}
exports.RsaPublicKey = RsaPublicKey;
class RsaPrivateKey {
    constructor(d, n) {
        this.d = d;
        this.n = n;
    }
    decrypt(c) {
        return bcu.modPow(c, this.d, this.n);
    }
    sign(m) {
        return bcu.modPow(m, this.d, this.n);
    }
}
exports.RsaPrivateKey = RsaPrivateKey;
async function generateRsaKeys(bitlenght) {
    let p, q, n, phin;
    const e = 65537n;
    do {
        p = await bcu.prime(Math.floor(bitlenght / 2) + 1);
        q = await bcu.prime(Math.floor(bitlenght / 2));
        n = p * q;
        phin = (p - 1n) * (q - 1n);
    } while (p == q || bcu.bitLength(n) !==
        bitlenght || phin % e == 0n);
    const d = bcu.modInv(e, phin);
    const publicKey = new RsaPublicKey(e, n);
    const privateKey = new RsaPrivateKey(d, n);
    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
}
exports.generateRsaKeys = generateRsaKeys;

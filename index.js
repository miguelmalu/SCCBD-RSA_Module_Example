import * as bcu from 'bigint-crypto-utils';
export class RsaPublicKey {
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
export class RsaPrivateKey {
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
export async function generateRsaKeys(bitlenght) {
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

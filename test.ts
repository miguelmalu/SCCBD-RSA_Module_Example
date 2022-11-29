import * as rsa from './index'
import * as bcu from 'bigint-crypto-utils'

async function test () {
    const keypair = await rsa.generateRsaKeys(1024)
    
    const m = 1253n
    console.log('m = ' + m)

    const c = keypair.publicKey.encrypt(m)
    console.log('c = ' + c)

    const d = keypair.privateKey.decrypt(c)
    console.log('d = ' + d)

    if (d == m) {
        console.log('OK')
    } else {
        console.log('ERROR')
    }
    
    // Blind signature (using Bob keys) //
    console.log('Blind signature')

    // Alice
    const m2 = 27n
    const r = bcu.randBetween(keypair.publicKey.n - 1n)
    const blindedM = m2 * keypair.publicKey.encrypt(r) % keypair.publicKey.n

    // Bob
    const blindSignature = keypair.privateKey.sign(blindedM)

    //Alice
    const signature = blindSignature * bcu.modInv(r,keypair.publicKey.n)

    if (keypair.publicKey.verify(signature) !== m2) {
        console.log("NO")
    } else {
        console.log("YES")
    }
}

test()
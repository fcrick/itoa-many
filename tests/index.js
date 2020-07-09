import assert from 'assert'
import itoaManyModule from '../index.js'

const memory = new WebAssembly.Memory({initial:1})
const { itoaMany } = itoaManyModule({env: {memory: memory}})

const buffer = memory.buffer
const dataView = new DataView(buffer, 0, buffer.byteLength)

// make sure one number works
dataView.setInt32(0, 1, true)
const testNumber = 12345
dataView.setInt32(4, testNumber, true)

itoaMany(8, 0)

const testString = testNumber.toString()
assert.equal(dataView.getInt32(8, true), testString.length)
for (let i = 0; i < testString.length; ++i) {
    assert.equal(dataView.getUint8(12 + i), testString.charCodeAt(i))
}

// try running the module where we provide a javascript implementation of itoa
// instead of using the wasm one, to verify swapping out works
const {itoaMany: itoaManyCustom} = itoaManyModule({
    env: {memory: memory},
    itoa: { itoa: jsItoa },
})

dataView.setInt32(0, 1, true)
const testNumber2 = 654321
dataView.setInt32(4, testNumber2, true)

itoaManyCustom(8, 0)

const testString2 = testNumber2.toString()

// note the negative as js below sets length to negative number
assert.equal(dataView.getInt32(8, true), -testString2.length)
for (let i = 0; i < testString2.length; ++i) {
    assert.equal(dataView.getUint8(12 + i), testString2.charCodeAt(i))
}

console.log("ok");

// below is itoa just done in javascript against the buffer - this is to test
// that the implementation of itoa can be swapped out.

// it's the same as the wasm one but always makes te length negative so we can
// check that it's running this code and not @fcrick/itoa
function jsItoa(dest, i) {
    const zero = 48n
    const dash = 45n

    i = BigInt(i)
    dest = BigInt(dest)

    // i32.MIN_VALUE can't be negated, so we just hardcode the output for simplicity
    if (i === -(2n ** 31n)) {
        dataView.setUint32(dest + 0x0n, 0x0000000bn, true)
        dataView.setUint32(dest + 0x4n, 0x3431322dn, true)
        dataView.setUint32(dest + 0x8n, 0x33383437n, true)
        dataView.setUint32(dest + 0xcn, 0x00383436n, true)
        return;
    }

    let offset = dest + 4n
    dataView.setUint8(Number(offset), Number(zero))

    const minus = i < 0n
    if (minus) {
        i = -i
    }

    while (i > 0n) {
        dataView.setUint8(Number(offset), Number(zero + (i % 10n)))
        offset += 1n
        i /= 10n
    }

    // just put the minus on the end before we reverse
    if (minus) {
        dataView.setUint8(Number(offset), Number(dash))
        offset += 1n
    }

    // length is at least 1 for the 0
    const length = (offset - dest - 4n) || 1n

    // reverse the string
    let swap = length / 2n
    while (swap > 0n) {
        let a = dest + 4n + swap - 1n
        let b = dest + 4n + length - swap
        let temp = dataView.getUint8(Number(a))
        dataView.setUint8(Number(a), dataView.getUint8(Number(b)))
        dataView.setUint8(Number(b), temp)
        swap -= 1n
    }

    dataView.setInt32(Number(dest), Number(-length), true)
}

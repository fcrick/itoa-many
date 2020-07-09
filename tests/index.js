import assert from 'assert'
import itoaManyModule from '../index.js'

const memory = new WebAssembly.Memory({initial:1})
const {itoaMany} = itoaManyModule({env:{memory:memory}})

const buffer = memory.buffer
const dataView = new DataView(buffer, 0, buffer.byteLength)

// make sure one number works
dataView.setInt32(0, 1, true)
const testNumber = 12345
dataView.setInt32(4, 12345, true)

itoaMany(8, 0)

const testString = testNumber.toString()
assert.equal(dataView.getInt32(8, true), testString.length)
for (let i = 0; i < testString.length; ++i) {
    assert.equal(dataView.getUint8(12 + i), testString.charCodeAt(i))
}
console.log("ok");

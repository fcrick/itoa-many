const memory = new WebAssembly.Memory({initial:0})
const {itoaMany} = require('./index')(memory)
const decoder = new (require('string_decoder').StringDecoder)('utf8')
let buffer = memory.buffer
let dataView = new DataView(buffer, 0, buffer.byteLength)

function getString(buffer, offset) {
    const length = dataView.getInt32(offset, true)
    return decoder.write(new DataView(buffer, offset + 4, length))
}

function testStuff() {
    let numbers = [
        432434,
        -2147483647,
        -2147483648,
        0,
        5,
        11111,
        222222,
        987654321,
        87654321,
        7654321,
        654321,
        54321,
        4321,
        321,
        21,
        1,
    ]

    numbers = [-2147483648]
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)


    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)
    numbers = numbers.concat(numbers)

    // const stringsOffset = setup(numbers)
    // runItoaMany(stringsOffset, 0, numbers.length)

    numbers.forEach((n, i) => {
        numbers[i] = -2147483648 + i
    })

    // numbers = [0]

    const stringsOffset = setup(numbers)
    runItoaMany(stringsOffset, 0, numbers.length)

    console.log(getString(buffer, stringsOffset))
}

function setup(numbers) {
    console.log(`doing ${numbers.length} numbers`)
    const requiredBytes = 4 + numbers.length * (4 + 16)
    console.log(`needs ${requiredBytes} bytes`)
    const requiredPages = Math.ceil(requiredBytes / (64 * 1024))
    console.log(`needs ${requiredPages} pages`)

    const pagesShort = requiredPages - buffer.byteLength / (64 * 1024)
    console.log(`${pagesShort} pages short. growing...`)
    if (pagesShort > 0) {
        memory.grow(pagesShort)
        buffer = memory.buffer
        dataView = new DataView(buffer, 0, buffer.byteLength)
    }

    dataView.setInt32(0, numbers.length, true)
    numbers.forEach((n, i) => {
        dataView.setInt32(4 * (i + 1), n, true)
    })

    // write all the int strings after the source values
    const stringsOffset = 4 * (numbers.length + 1)
    return stringsOffset
}

function runItoaMany(dest, src, count) {
    console.time('itoaMany')
    const start = process.hrtime()
    itoaMany(dest, src)
    const end = process.hrtime()
    console.timeEnd('itoaMany')

    const elapsedNs = (end[0] * 1e9 + end[1]) - (start[0] * 1e9 + start[1])
    console.log(elapsedNs)
    console.log(`nanoseconds each: ${elapsedNs / count}`)
}

testStuff()
// numbers.forEach((n, i) => {
//     console.log(getString(buffer, stringsOffset + i * 16))
// })

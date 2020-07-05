
import {itoa} from './itoa'

// someday hopefully something like this will work:
// import {itoa} from '@fcrick/itoa/assembly'

export function itoaMany(dest: i32, array: i32): void {
    // argument is a length prefixed array of integers
    let count: i32 = load<i32>(array)
    array += sizeof<i32>();
    while (count > 0) {
        itoa(dest, load<i32>(array));
        array += sizeof<i32>();
        count -= sizeof<u8>();

        // space out results every 16 bytes as the largest number is 11 characters,
        // plus 4 for the length prefix, then aligned.
        dest += align(sizeof<i32>() + 11, 4)
    }
}

function align(ptr: i32, alignment: i32): i32 {
    let mask: i32 = alignment - 1;
    return (ptr + mask) & ~mask;
}

import wasmBuffer from './optimized.wasm.js'
const compiled = new WebAssembly.Module(wasmBuffer)

import itoaModule from '@fcrick/itoa'

export default function(imports) {
    // usually caller will provide something, but if not, fill in the minimum
    if (!imports) {
        imports = {env: {memory: new WebAssembly.Memory({initial: 1})}}
    }

    // instantiate itoa unless caller provided it already
    if (!imports.itoa) {
        imports = {
            itoa: itoaModule({...imports}),
            ...imports
        }
    }

    return new WebAssembly.Instance(compiled, imports).exports
}

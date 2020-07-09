import wasmBuffer from './optimized.wasm.js'
const compiled = new WebAssembly.Module(wasmBuffer)

import itoaModule from '@fcrick/itoa'

export default function(imports) {
    return new WebAssembly.Instance(compiled, {itoa: itoaModule({...imports}),
        ...imports
    }).exports
}

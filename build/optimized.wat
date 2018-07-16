(module
 (type $iiv (func (param i32 i32)))
 (import "itoa" "itoa" (func $assembly/itoa/itoa (param i32 i32)))
 (import "env" "memory" (memory $0 0))
 (export "itoaMany" (func $assembly/index/itoaMany))
 (export "memory" (memory $0))
 (func $assembly/index/itoaMany (; 1 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (local $2 i32)
  ;;@ assembly/index.ts:6:4
  (set_local $2
   ;;@ assembly/index.ts:6:21
   (i32.load
    ;;@ assembly/index.ts:6:31
    (get_local $1)
   )
  )
  ;;@ assembly/index.ts:7:4
  (set_local $1
   (i32.add
    (get_local $1)
    ;;@ assembly/index.ts:7:13
    (i32.const 4)
   )
  )
  (loop $continue|0
   (if
    ;;@ assembly/index.ts:8:11
    (i32.gt_s
     (get_local $2)
     ;;@ assembly/index.ts:8:19
     (i32.const 0)
    )
    (block
     ;;@ assembly/index.ts:9:8
     (call $assembly/itoa/itoa
      ;;@ assembly/index.ts:9:13
      (get_local $0)
      ;;@ assembly/index.ts:9:19
      (i32.load
       ;;@ assembly/index.ts:9:29
       (get_local $1)
      )
     )
     ;;@ assembly/index.ts:10:8
     (set_local $1
      (i32.add
       (get_local $1)
       ;;@ assembly/index.ts:10:17
       (i32.const 4)
      )
     )
     ;;@ assembly/index.ts:11:8
     (set_local $2
      (i32.sub
       (get_local $2)
       ;;@ assembly/index.ts:11:17
       (i32.const 1)
      )
     )
     ;;@ assembly/index.ts:15:8
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 16)
      )
     )
     (br $continue|0)
    )
   )
  )
 )
)

(module
 (type $iiv (func (param i32 i32)))
 (type $iii (func (param i32 i32) (result i32)))
 (import "itoa" "itoa" (func $assembly/itoa/itoa (param i32 i32)))
 (import "env" "memory" (memory $0 0))
 (global $HEAP_BASE i32 (i32.const 8))
 (export "itoaMany" (func $assembly/index/itoaMany))
 (export "memory" (memory $0))
 (func $assembly/index/align (; 1 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  ;;@ assembly/index.ts:20:4
  (set_local $2
   ;;@ assembly/index.ts:20:20
   (i32.sub
    (get_local $1)
    ;;@ assembly/index.ts:20:32
    (i32.const 1)
   )
  )
  ;;@ assembly/index.ts:21:27
  (i32.and
   ;;@ assembly/index.ts:21:11
   (i32.add
    ;;@ assembly/index.ts:21:12
    (get_local $0)
    ;;@ assembly/index.ts:21:18
    (get_local $2)
   )
   ;;@ assembly/index.ts:21:26
   (i32.xor
    ;;@ assembly/index.ts:21:27
    (get_local $2)
    (i32.const -1)
   )
  )
 )
 (func $assembly/index/itoaMany (; 2 ;) (type $iiv) (param $0 i32) (param $1 i32)
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
  ;;@ assembly/index.ts:8:4
  (block $break|0
   (loop $continue|0
    (if
     ;;@ assembly/index.ts:8:11
     (i32.gt_s
      (get_local $2)
      ;;@ assembly/index.ts:8:19
      (i32.const 0)
     )
     (block
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
         ;;@ assembly/index.ts:15:16
         (call $assembly/index/align
          ;;@ assembly/index.ts:15:22
          (i32.add
           (i32.const 4)
           ;;@ assembly/index.ts:15:38
           (i32.const 11)
          )
          ;;@ assembly/index.ts:15:42
          (i32.const 4)
         )
        )
       )
      )
      (br $continue|0)
     )
    )
   )
  )
 )
)

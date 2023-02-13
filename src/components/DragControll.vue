<template>
  
  <CylinderArrow 
    :color="'#ff0000'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: getDegVal(90) }"
  ></CylinderArrow>
  <CylinderArrow
    :color="'#00ff00'"
    :position="position"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
  ></CylinderArrow>
  <CylinderArrow
    :color="'#0000ff'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: 0 }"
  ></CylinderArrow>
  <RingArrow
    :color="'#ff00ff'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: getDegVal(-90) }"
  ></RingArrow>
  <RingArrow
    :color="'#ffff00'"
    :position="position"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
  ></RingArrow>
  <RingArrow
    :color="'#00ffff'"
    :position="position"
    :rotation="{ x: 0, y: getDegVal(90), z: 0 }"
  ></RingArrow>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { inject, PropType, ShallowRef } from 'vue'
import CylinderArrow from '@/components/CylinderArrow.vue'
import RingArrow from '@/components/RingArrow.vue'
import { getDegVal } from '@/common/getDegVal'
import { Renderer } from 'troisjs'

defineProps({
  color: {
    type: String,
    default: ''
  },
  position: {
    type: Object as PropType<{ x: number; y: number; z: number }>,
    default: () => ({ x: 0, y: 0, z: 0 })
  }
})

const render:
  | ShallowRef<
      | (typeof Renderer & {
          canvas: HTMLCanvasElement
          camera: THREE.PerspectiveCamera
          scene: THREE.Scene
        })
      | null
    >
  | undefined = inject('render')

const dragTranslate = () => {}

// const onPointerMove = (ev: PointerEvent) => {}

// const onPointerUp = (ev: PointerEvent) => {
//   window.removeEventListener('pointermove', onPointerMove)
//   window.removeEventListener('pointerup', onPointerUp)
// }

// const onPointerDown = (ev: PointerEvent) => {
//   if (!render?.value?.camera || !render.value.scene) {
//     return
//   }
//   window.addEventListener('pointermove', onPointerMove)
//   window.addEventListener('pointerup', onPointerUp)

//   const target = getMeshByClient(ev, render.value.camera, render.value.scene)
//   console.log(target)
// }

// window.addEventListener('pointerdown', onPointerDown)
</script>

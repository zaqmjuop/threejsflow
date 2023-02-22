<template>
  <CylinderArrow
    :color="'#ff0000'"
    :position="state"
    :rotation="{ x: 0, y: 0, z: getDegVal(90) }"
    @drag-start="handleDragStart($event, 'x')"
    @drag-move="handleDragMove($event, 'x')"
    @drag-end="handleDragEnd($event, 'x')"
  ></CylinderArrow>
  <CylinderArrow
    :color="'#00ff00'"
    :position="state"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
    @drag-start="handleDragStart($event, 'x')"
    @drag-move="handleDragMove($event, 'x')"
    @drag-end="handleDragEnd($event, 'x')"
  ></CylinderArrow>
  <CylinderArrow
    :color="'#0000ff'"
    :position="state"
    :rotation="{ x: 0, y: 0, z: 0 }"
    @drag-start="handleDragStart($event, 'x')"
    @drag-move="handleDragMove($event, 'x')"
    @drag-end="handleDragEnd($event, 'x')"
  ></CylinderArrow>
  <RingArrow
    :color="'#ff00ff'"
    :position="state"
    :rotation="{ x: 0, y: 0, z: getDegVal(-90) }"
  ></RingArrow>
  <RingArrow
    :color="'#ffff00'"
    :position="state"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
  ></RingArrow>
  <RingArrow
    :color="'#00ffff'"
    :position="state"
    :rotation="{ x: 0, y: getDegVal(90), z: 0 }"
  ></RingArrow>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { inject, PropType, shallowReactive, ShallowRef } from 'vue'
import CylinderArrow from '@/components/CylinderArrow.vue'
import RingArrow from '@/components/RingArrow.vue'
import { getDegVal } from '@/common/getDegVal'
import { Renderer } from 'troisjs'
import { Vector3 } from 'three'
import { useCameraStore } from '@/store/cameraStore'

const props = defineProps({
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

const state = shallowReactive<{
  dragStart: null | PointerEvent
  prevMove: null | PointerEvent
  x: number
  y: number
  z: number
}>({
  dragStart: null,
  prevMove: null,
  x: props.position.x,
  y: props.position.y,
  z: props.position.z
})

const cameraStore = useCameraStore()

const handleDragStart = (event: PointerEvent, direction: 'x' | 'y' | 'z') => {
  state.dragStart = event
  cameraStore.dragStart = event
}

const handleDragMove = (event: PointerEvent, direction: 'x' | 'y' | 'z') => {
  const { movementX, movementY } = event
  const cameraDirection = new Vector3()
  const camera = render?.value?.camera
  camera && camera.getWorldDirection(cameraDirection)
  const cameraRotation =
    camera && new Vector3(0, 0, 0).setFromEuler(camera.rotation)
  const pointerVector3 = new Vector3(movementX, -movementY, -1)

  const v1 = cameraRotation

  const getVerticalV2 = (v1: Vector3) => {
    const x2 = movementX
    const y2 = -movementY
    const z2 = -(v1.x * x2 + v1.y * y2) / v1.z
    console.log(new Vector3(x2, y2, z2))
    return new Vector3(x2, y2, z2)
  }

  const getVerticalV3 = (v1: Vector3, v2: Vector3) => {
    return new Vector3(0, 0, 0).copy(v1).multiply(v2)
  }

  const v2 = getVerticalV2(cameraDirection)
  const v3 = getVerticalV3(v2, cameraDirection)

  console.log(pointerVector3, cameraDirection, cameraRotation, camera, v2, v3)
  const prevPointer = state.prevMove || state.dragStart
  if (prevPointer && cameraRotation && v1) {
    state.x += v1.x
    state.y += v1.y
    state.z += v1.z
    state.prevMove = event
  }
}

const handleDragEnd = (event: PointerEvent, direction: 'x' | 'y' | 'z') => {
  state.dragStart = null
  cameraStore.dragStart = null
}
</script>

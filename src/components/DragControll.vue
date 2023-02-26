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
import { Vector2, Vector3, Intersection, Object3D, Event } from 'three'
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
  dragStart:
    | null
    | (PointerEvent & { dragStart: Intersection<Object3D<Event>> | null })
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

const handleDragStart = (
  event: PointerEvent & { dragStart: Intersection<Object3D<Event>> | null },
  direction: 'x' | 'y' | 'z'
) => {
  state.dragStart = event
  cameraStore.dragStart = event
}

const handleDragMove = (event: PointerEvent, direction: 'x' | 'y' | 'z') => {
  const camera = render?.value?.camera
  if (!camera) {
    return
  }

  const prevMove = state.prevMove || state.dragStart || event
  const moved = new Vector2(
    event.clientX - prevMove.clientX,
    event.clientY - prevMove.clientY
  )

  const cameraDirection = new Vector3()
  camera.getWorldDirection(cameraDirection)

  const cameraRight = new Vector3()
  cameraRight.crossVectors(camera.up, cameraDirection)

  let dir = cameraRight
  if (moved.x) {
    dir = moved.x < 0 ? cameraRight : cameraRight.clone().negate()
  } else if (moved.y) {
    dir = moved.y < 0 ? camera.up : camera.up.clone().negate()
  }

  state.x += dir.x
  state.y += dir.y
  state.z += dir.z
  state.prevMove = event
  console.log((state.dragStart as any)?.distance)
}

const handleDragEnd = (event: PointerEvent, direction: 'x' | 'y' | 'z') => {
  state.dragStart = null
  cameraStore.dragStart = null
}
</script>

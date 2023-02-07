<template>
  <Group
    :position="{
      x: position.x,
      y: position.y,
      z: position.z
    }"
    :rotation="rotation"
  >
    <Cylinder
      :position="{
        x: 0,
        y: 5,
        z: 0
      }"
      :height="10"
      :radiusTop="1"
      :radiusBottom="1"
      @pointerDown="onPointerDown"
      @pointerMove="onPointerMove"
      @pointerUp="onPointerUp"
      @pointerOver="onPointerOver"
      @pointerEnter="onPointerEnter"
      @pointerLeave="onPointerLeave"
      @click="onClick"
    >
      <PhongMaterial
        :color="color"
        :props="{
          emissive: 0x072534,
          opacity: 0.7,
          side: 2,
          flatShading: true
        }"
      ></PhongMaterial>
    </Cylinder>
    <Cone
      :position="{
        x: 0,
        y: 12.5,
        z: 0
      }"
      :height="5"
      :radius="1.5"
      @pointerDown="onPointerDown"
      @click="onClick"
      @pointerOver="onPointerOver"
      @pointerUp="onPointerUp"
    >
      <PhongMaterial
        :color="color"
        :props="{
          emissive: 0x072534,
          opacity: 0.7,
          side: 2,
          flatShading: true
        }"
      ></PhongMaterial> </Cone
  ></Group>
</template>
<script lang="ts" setup>
import { Cylinder, Cone, PhongMaterial, Group } from 'troisjs'
import { PropType, shallowReactive } from 'vue'

defineProps({
  color: {
    type: String,
    default: ''
  },
  rotation: {
    type: Object as PropType<{ x: number; y: number; z: number }>,
    default: () => ({ x: 0, y: 0, z: 0 })
  },
  position: {
    type: Object as PropType<{ x: number; y: number; z: number }>,
    default: () => ({ x: 0, y: 0, z: 0 })
  }
})

const emit = defineEmits<{
  (event: 'change'): void
  (event: 'pointerDown', ev: PointerEvent): void
  (event: 'pointerMove', ev: PointerEvent): void
  (event: 'pointerUp', ev: PointerEvent): void
  (event: 'dragMove', ev: PointerEvent): void
}>()

const state = shallowReactive({
  dragStart: null as null | PointerEvent
})

const onPointerMove = (ev: PointerEvent) => {
  console.log('onPointerMove')
  emit('pointerMove', ev)
  if (state.dragStart) {
    emit('dragMove', ev)
    console.log(state.dragStart, ev)
    return
  }
}

const onPointerUp = (ev: PointerEvent) => {
  console.log('onPointerUp')
  state.dragStart = null
  emit('pointerUp', ev)
}

const onPointerDown = (ev: PointerEvent) => {
  console.log(111)
  state.dragStart = ev
  emit('pointerDown', ev)
}

const onPointerOver = () => {
  console.log('onPointerOver')
}
const onPointerLeave = () => {
  console.log('onPointerLeave')
}
const onPointerEnter = () => {
  console.log('onPointerEnter')
}
const onClick = () => {
  console.log('onClick')
}
</script>

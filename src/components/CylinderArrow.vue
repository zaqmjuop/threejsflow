<template>
  <Group
    ref="group"
    :position="{
      x: position.x,
      y: position.y,
      z: position.z
    }"
    :rotation="rotation"
    @pointerDown="onPointerDown"
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
import {
  PropType,
  shallowReactive,
  ShallowRef,
  inject,
  onMounted,
  ref,
  watch
} from 'vue'
import { Renderer } from 'troisjs'
import { usePointerDown } from '@/use/usePointerDown'

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

const group = ref<null | typeof Group>(null)

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

onMounted(() => {
  const camera = render?.value?.camera
  const scene = render?.value?.scene
  if (camera && scene) {
    const pointerDownState = usePointerDown({ camera, scene })
    watch(
      () => pointerDownState.value,
      () => {
        if (pointerDownState.value?.object?.uuid === group.value?.o3d?.uuid) {
          emit('pointerDown', pointerDownState.event as PointerEvent)
        }
      }
    )
  }
})
</script>

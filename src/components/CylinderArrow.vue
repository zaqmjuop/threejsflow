<template>
  <Group
    ref="group"
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
import { Object3D } from 'three'
import { Cylinder, Cone, PhongMaterial, Group } from 'troisjs'
import { PropType, ShallowRef, inject, onMounted, ref } from 'vue'
import { Renderer } from 'troisjs'
import { useDrag } from '@/use/useDrag'

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
  (event: 'dragStart', ev: PointerEvent): void
  (event: 'dragMove', ev: PointerEvent): void
  (event: 'dragEnd', ev: PointerEvent): void
}>()

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

onMounted(() => {
  const camera = render?.value?.camera
  const scene = render?.value?.scene
  const groupObj: Object3D | null = group.value?.o3d

  if (camera && scene && groupObj) {
    useDrag({
      camera,
      scene,
      uuid: groupObj.uuid,
      onDragStart(event) {
        emit('dragStart', event)
      },
      onDragMove(event) {
        emit('dragMove', event)
      },

      onDragEnd(event) {
        emit('dragEnd', event)
      }
    })
  }
})
</script>

<template>
  <Box
    :size="10"
    ref="meshC"
    :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
    :position="{ x: 0, y: 30, z: -130 }"
  >
    <LambertMaterial />
  </Box>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, ShallowRef } from 'vue'
import { Box, LambertMaterial, MeshPublicInterface, Renderer } from 'troisjs'

const rendererC:
  | ShallowRef<
      | (typeof Renderer & {
          canvas: HTMLCanvasElement
          camera: THREE.PerspectiveCamera
          scene: THREE.Scene
        })
      | null
    >
  | undefined = inject('render')
const meshC = ref()

onMounted(() => {
  const renderer = rendererC?.value
  if (!renderer) {
    return
  }
  const mesh = (meshC.value as MeshPublicInterface).mesh
  renderer.onBeforeRender(() => {
    mesh!.rotation.x += 0.01
  })
})
</script>

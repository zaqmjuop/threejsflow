<template>
  <Box
    :size="10"
    ref="meshC"
    :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
    :position="{ x: 0, y: 30, z: -130 }"
  >
    <PhongMaterial
      :color="'#ff0000'"
      :props="{
        emissive: 0xfff000
      }"
    />
  </Box>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, ShallowRef } from 'vue'
import { Box, PhongMaterial, Renderer, Camera, Scene } from 'troisjs'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { WebGLRenderer, Vector2 } from 'three'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

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
const scene: ShallowRef<typeof Scene | null> | undefined = inject('scene')
const camera: ShallowRef<typeof Camera | null> | undefined = inject('camera')
const meshC = ref()

const unrealBloomPass = new UnrealBloomPass( // UnrealBloomPass通道可实现一个泛光效果。
  new Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
)
const bloomPass = new BloomPass()

onMounted(() => {
  const data = {
    renderer: rendererC?.value?.renderer as WebGLRenderer,
    scene: scene?.value?.scene,
    camera: camera?.value?.camera
  }
  if (data.renderer && data.scene && data.camera) {
    const composer = new EffectComposer(data.renderer)
    const renderPass = new RenderPass(data.scene, data.camera)
    composer.addPass(bloomPass)
    composer.addPass(unrealBloomPass)
    composer.addPass(renderPass)
    composer.render()
  }
})
</script>

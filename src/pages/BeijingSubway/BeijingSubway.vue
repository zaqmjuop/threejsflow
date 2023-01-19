<template>
  <div class="absolute-div">{{ hoverData.pointerX }}</div>
  <Renderer
    ref="rendererC"
    antialias
    :orbit-ctrl="{ enableDamping: true }"
    resize="window"
  >
    <Camera ref="cameraRef" :position="{ x: 0, y: 30, z: 130 }" />
    <Scene ref="sceneRef">
      <PointLight :position="{ z: 300 }" />
      <BeijingRegion />
      <StationList :stationList="BEIJING_STATION_DATA"></StationList>
    </Scene>
  </Renderer>
</template>
<script setup lang="ts">
import { BEIJING_STATION_DATA } from '@/constant/BeijingStationData'
import { Camera, PointLight, Renderer, Scene } from 'troisjs'
import StationList from './StationList.vue'
import BeijingRegion from './BeijingRegion.vue'
import * as THREE from 'three'
import { reactive, ref, onMounted } from 'vue'
import { useHover } from '@/use/useHover'

const cameraRef = ref<typeof Camera | null>(null)
const sceneRef = ref<typeof Scene | null>(null)
const hoverData = ref<any>({})

onMounted(() => {
  const camera = cameraRef.value?.camera as THREE.PerspectiveCamera | null
  const scene = sceneRef.value?.scene as THREE.Scene | null
  if (camera && scene) {
    useHover({ camera, scene })
  }
})

// 鼠标位置
// 摄像机位置 camera.getWorldPosition(v)
// 摄像机方向 camera.getWorldDirection(new THREE.Vector3(0,0,0))
</script>
<style scoped>
.absolute-div {
  position: fixed;
  left: 0;
  top: 0;
  color: #fff;
  text-shadow: 1px 1px #ff0000, -1px -1px #0000ff;
}
</style>

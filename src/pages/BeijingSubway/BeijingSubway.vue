<template>
  <Renderer
    ref="rendererC"
    antialias
    :orbit-ctrl="{ enableDamping: true }"
    resize="window"
  >
    <Camera :position="{ x: 1000, y: 600, z: 500 }" />
    <Scene>
      <PointLight :position="{ z: 300 }" />
      <BeijingRegion />
      <StationList :stationList="BEIJING_STATION_DATA"></StationList>
    </Scene>
  </Renderer>
</template>
<script setup lang="ts">
import { BEIJING_STATION_DATA } from '@/constant/BeijingStationData'
import {
  Box,
  Camera,
  LambertMaterial,
  MeshPublicInterface,
  PointLight,
  Renderer,
  RendererPublicInterface,
  Scene
} from 'troisjs'
import StationList from './StationList.vue'
import BeijingRegion from './BeijingRegion.vue'
</script>

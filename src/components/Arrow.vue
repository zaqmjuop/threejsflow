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
import { PropType } from 'vue'

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
</script>

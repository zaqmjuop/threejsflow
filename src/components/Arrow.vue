<template>
  <Group
    :position="{
      x: position.x,
      y: position.y + 20,
      z: position.z
    }"
  >
    <Cylinder
      :position="{
        x: 0,
        y: 0,
        z: 0
      }"
      :height="10"
      :radiusTop="1"
      :radiusBottom="1"
    >
      <PhongMaterial
        color="#156289"
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
        y: 0,
        z: 0
      }"
      :height="5"
      :radius="1.5"
    >
      <PhongMaterial
        color="#156289"
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
import { Cylinder, Cone, PhongMaterial } from 'troisjs'
import { PropType } from 'vue'

defineProps({
  color: {
    type: String,
    default: ''
  },
  position: {
    type: Object as PropType<{ x: number; y: number; z: number }>,
    default: () => ({ x: 0, y: 0, z: 0 })
  }
})
</script>

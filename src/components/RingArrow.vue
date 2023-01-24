<template>
  <Group
    :position="{
      x: position.x,
      y: position.y,
      z: position.z
    }"
    :rotation="rotation"
  >
    <Ring
      :innerRadius="5"
      :outer-radius="6"
      :theta-segments="18"
      :theta-length="getDegVal(235)"
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
    </Ring>
    <Triangle
      :position="{
        x: 10,
        y: 10,
        z: 0
      }"
      :width="4"
      :height="2"
      :width-segments="1"
    >
      <PhongMaterial
        :color="color"
        :props="{
          emissive: 0x072534,
          opacity: 0.7,
          side: 2,
          flatShading: true
        }"
      ></PhongMaterial
    ></Triangle>
  </Group>
</template>
<script lang="ts" setup>
import { PhongMaterial, Group, Ring } from 'troisjs'
import { PropType } from 'vue'
import { getDegVal } from '@/common/getDegVal'
import Triangle from './Triangle'

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

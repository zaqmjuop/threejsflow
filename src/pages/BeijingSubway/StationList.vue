<template>
  <Group>
    <Cylinder
      v-for="(item, index) in stationList"
      :position="{
        x: item.position.x,
        y: item.position.y,
        z: item.position.z
      }"
      :height="10"
      :radiusTop="4"
      :radiusBottom="4"
    >
      <PhongMaterial
        color="#156289"
        :props="{
          emissive: 0x072534,
          opacity: 0.7,
          side: 2,
          flatShading: true
        }"
      />
    </Cylinder>
  </Group>
</template>
<script setup lang="ts">
import {
  BasicMaterial,
  Plane,
  Cone,
  PhongMaterial,
  Group,
  Cylinder
} from 'troisjs'
import { Station } from '@/type/BeijingSubway'
import { PropType } from 'vue'
defineProps({
  stationList: {
    type: Array as PropType<Array<Station>>
  }
})
</script>

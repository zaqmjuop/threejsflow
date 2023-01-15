<template>
  <Group>
    <Group v-for="(item, index) in stationList?.slice(13, 14)">
      <Cylinder
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

      <Text2
        :text="item.stationName"
        :fontSrc="YaHei_Regular"
        :size="5"
        :height="0.2"
        :position="{
          x: item.position.x - 10,
          y: item.position.y + 10,
          z: item.position.z
        }"
      >
        <BasicMaterial
          color="red"
          :props="{
            wireframe: false,
            transparent: true,
            opacity: 1,
            side: 2
          }"
        />
      </Text2>
    </Group>
  </Group>
</template>
<script setup lang="ts">
import { BasicMaterial, PhongMaterial, Group, Cylinder } from 'troisjs'
import { Station } from '@/type/BeijingSubway'
import { PropType } from 'vue'
import Text2 from '@/components/Text2'

import YaHei_Regular from '@/assets/Microsoft-YaHei-Regular.json'

defineProps({
  stationList: {
    type: Array as PropType<Array<Station>>
  }
})
</script>

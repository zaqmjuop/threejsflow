<template>
  <CylinderArrow
    :color="'#ff0000'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: getDegVal(90) }"
  ></CylinderArrow>
  <CylinderArrow
    :color="'#00ff00'"
    :position="position"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
  ></CylinderArrow>
  <CylinderArrow
    :color="'#0000ff'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: 0 }"
  ></CylinderArrow>
  <RingArrow
    :color="'#ff00ff'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: getDegVal(-90) }"
  ></RingArrow>
  <RingArrow
    :color="'#ffff00'"
    :position="position"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
  ></RingArrow>
  <RingArrow
    :color="'#00ffff'"
    :position="position"
    :rotation="{ x: 0, y: getDegVal(90), z: 0 }"
  ></RingArrow>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import CylinderArrow from '@/components/CylinderArrow.vue'
import RingArrow from '@/components/RingArrow.vue'
import { getDegVal } from '@/common/getDegVal'

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

<template>
  <Arrow
    :color="'#ff0000'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: getDegVal(90) }"
  ></Arrow>
  <Arrow
    :color="'#00ff00'"
    :position="position"
    :rotation="{ x: getDegVal(90), y: 0, z: 0 }"
  ></Arrow>
  <Arrow
    :color="'#0000ff'"
    :position="position"
    :rotation="{ x: 0, y: 0, z: 0 }"
  ></Arrow>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import Arrow from '@/components/Arrow.vue'
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

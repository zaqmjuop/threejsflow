<template>
  <Arrow :position="position"></Arrow>
  <Arrow :position="position"></Arrow>
  <Arrow :position="position"></Arrow>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import Arrow from '@/components/Arrow.vue'

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

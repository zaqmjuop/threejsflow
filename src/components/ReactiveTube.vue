<template>
  <Tube
    :path="path"
    :tubularSegments="tubularSegments"
    :radius="radius"
    :radialSegments="radialSegments"
    :closed="closed"
  >
    <slot />
  </Tube>
</template>
<script setup lang="ts">
import { BasicMaterial, PhongMaterial, Group, Cylinder, Tube } from 'troisjs'
import { PropType, watch, computed } from 'vue'
import { Vector3, CatmullRomCurve3 } from 'three'

const props = defineProps({
  start: {
    type: Object as PropType<{ x: number; y: number; z: number }>,
    default: () => ({ x: 0, y: 0, z: 0 })
  },
  end: {
    type: Object as PropType<{ x: number; y: number; z: number }>,
    default: () => ({ x: 0, y: 0, z: 0 })
  },
  tubularSegments: {
    type: Number,
    default: 0
  },
  radius: {
    type: Number,
    default: 0
  },
  radialSegments: {
    type: Number,
    default: 0
  },
  closed: {
    type: Boolean,
    default: false
  }
})

const path = computed(() => {
  return new CatmullRomCurve3([
    new Vector3(props.start.x, props.start.y, props.start.z),
    new Vector3(props.end.x, props.end.y, props.end.z)
  ])
})

watch(
  () => props.start,
  () => {
    console.log(props.start)
  }
)
</script>

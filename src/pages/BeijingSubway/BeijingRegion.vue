<template>
  <Plane :width="200" :height="200" :rotation="{ x: Math.PI / 2 }">
    <BasicMaterial color="#dddddd" :props="{ side: 2 }" />
  </Plane>
</template>
<script setup lang="ts">
import { BasicMaterial, Plane } from 'troisjs'
</script>

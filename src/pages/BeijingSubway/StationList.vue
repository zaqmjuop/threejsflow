<template>
  <Group>
    <Group v-for="(item, index) in stationList">
      <Cylinder
        ref="Cylinders"
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

      <Tube
        v-if="index > 0"
        :path="getLineCurve(stationList[index - 1].position, item.position)"
        :tubularSegments="10"
        :radius="2"
        :radialSegments="4"
        :closed="false"
      >
        <BasicMaterial color="#30b030" />
      </Tube>
    </Group>
  </Group>
</template>
<script setup lang="ts">
import { BasicMaterial, PhongMaterial, Group, Cylinder, Tube } from 'troisjs'
import { StationPosition, Station } from '@/type/BeijingSubway'
import { PropType, inject, ShallowRef, watch, ref } from 'vue'
import Text2 from '@/components/Text'
import YaHei_Regular from '@/assets/Microsoft-YaHei-Regular.json'
import { Vector3, CatmullRomCurve3, Mesh } from 'three'
import { DragControls } from '@/controls/DragControls'

const getLineCurve = (
  position1: StationPosition,
  position2: StationPosition
) => {
  return new CatmullRomCurve3([
    new Vector3(position1.x, position1.y, position1.z),
    new Vector3(position2.x, position2.y, position2.z)
  ])
}

defineProps({
  stationList: {
    type: Array as PropType<Array<Station>>,
    default: () => []
  }
})

const emit = defineEmits(['dragNode'])

const Cylinders = ref<null | Array<typeof Cylinder>>(null)

const dragControls: ShallowRef<DragControls | null> | undefined =
  inject('dragControls')

watch(
  () => dragControls?.value,
  (controls) => {
    if (!controls) {
      return
    }
    controls.addEventListener(
      'drag',
      (event: { type: 'drag'; object?: Mesh; target: DragControls }) => {
        const uuid = event.object?.uuid
        const CylinderList = Cylinders.value
        if (uuid && CylinderList?.length) {
          const index = CylinderList.findIndex((Cylinder) => {
            return Cylinder.mesh?.uuid === uuid
          })
          if (index > -1) {
            emit('dragNode', { index, mesh: event.object })
          }
        }
      }
    )
  }
)
</script>

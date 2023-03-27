<template>
  <div class="absolute-div"></div>
  <Renderer
    ref="rendererC"
    antialias
    resize="window"
    :orbit-ctrl="{
      enableRotate: true,
      enablePan: true
    }"
    :pointer="{
      touch: true
    }"
  >
    <Camera ref="cameraRef" :position="{ x: 0, y: 30, z: 130 }" />
    <Scene ref="sceneRef">
      <BloomCube></BloomCube>
      <PointLight :position="{ z: 300 }" />
      <BeijingRegion />
      <StationList
        :stationList="BEIJING_STATION_DATA"
        @dragNode="handleDragNode"
      ></StationList>
      <DragControll :position="{ x: -50, z: 10, y: 30 }" />
    </Scene>
  </Renderer>
</template>
<script setup lang="ts">
import { BEIJING_STATION_DATA } from '@/constant/BeijingStationData'
import { Camera, PointLight, Renderer, Scene } from 'troisjs'
import StationList from './StationList.vue'
import BeijingRegion from './BeijingRegion.vue'
import * as THREE from 'three'
import {
  onMounted,
  watch,
  shallowRef,
  provide,
  shallowReactive,
  computed,
  reactive
} from 'vue'
import { useHoverTarget } from '@/use/useHoverTarget'
import DragControll from '@/components/DragControll.vue'
import { useCameraStore } from '@/store/cameraStore'
import { DragControls } from '@/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import BloomCube from '@/components/BloomCube.vue'
import { useMultiSelect } from '@/use/useMultiSelect'

const cameraRef = shallowRef<typeof Camera | null>(null)
const sceneRef = shallowRef<typeof Scene | null>(null)
const rendererC = shallowRef<typeof Renderer | null>(null)
const dragControls = shallowRef<DragControls | null>(null)
const state = reactive({
  draging: false,
  enableOrbit: true,
  selecting: false,
  stationList: BEIJING_STATION_DATA
})

const orbitCtrl = computed<OrbitControls | undefined>(
  () => rendererC.value?.three.cameraCtrl
)

const cameraStore = useCameraStore()

watch(
  () => cameraStore.draging,
  () => {}
)

watch(
  () => state.draging || state.selecting,
  (disabled: boolean) => {
    if (!orbitCtrl.value) {
      return
    }
    orbitCtrl.value.enablePan = !disabled
    orbitCtrl.value.enableRotate = !disabled
  },
  { immediate: true }
)

provide('render', rendererC)
provide('scene', sceneRef)
provide('camera', cameraRef)
provide('dragControls', dragControls)

type Object3D = THREE.Object3D & {
  material: THREE.MeshBasicMaterial
}

let hoverTargetRef: ReturnType<typeof useHoverTarget> | null = null

const selecteds: THREE.Intersection<THREE.Object3D<THREE.Event>>[] =
  shallowReactive([])

provide('selecteds', selecteds)

const handleDragNode = (e: { index: number; mesh: THREE.Mesh }) => {
  const stationData = state.stationList[e.index]
  if (stationData) {
    stationData.position.x = e.mesh.position.x
    stationData.position.y = e.mesh.position.y
    stationData.position.z = e.mesh.position.z
  }
  console.log(state)
}

onMounted(() => {
  const camera = cameraRef.value?.camera as THREE.PerspectiveCamera | null
  const scene = sceneRef.value?.scene as THREE.Scene | null
  const canvas = rendererC.value?.canvas
  const renderer: THREE.Renderer | undefined = rendererC.value?.renderer
  if (camera && scene && renderer) {
    const selectState = useMultiSelect({ camera, scene, renderer })
    watch(
      () => selectState.state.selecting,
      () => {
        state.selecting = selectState.state.selecting
      }
    )
  }

  if (camera && scene && canvas instanceof HTMLCanvasElement) {
    hoverTargetRef = useHoverTarget({
      camera,
      scene
    })

    let prevObjectColor = -1

    // const selector = useSelect({ camera, scene, domElement: canvas })

    watch(
      () => hoverTargetRef?.value?.object,
      (object?, prev?) => {
        if (prev && prevObjectColor >= 0) {
          ;(prev as Object3D).material.color.setHex(prevObjectColor)
          prevObjectColor = -1
        }
        if (object) {
          prevObjectColor = (object as Object3D).material.color.getHex()
          ;(object as Object3D).material.color.setHex(0xffe599)
        }
      }
    )
  }
  if (camera && scene && canvas) {
    const controls = new DragControls(scene.children, camera, canvas)
    dragControls.value = controls
    controls.enabled = true

    // 监听拖拽事件并更新场景
    controls.addEventListener('dragstart', () => {
      state.draging = true
    })

    controls.addEventListener('dragend', () => {
      state.draging = false
    })
  }
})
</script>
<style>
.absolute-div {
  position: fixed;
  left: 0;
  top: 0;
  color: #fff;
  text-shadow: 1px 1px #ff0000, -1px -1px #0000ff;
}
.selectBox {
  border: 1px solid #55aaff;
  background-color: rgba(75, 160, 255, 0.3);
  position: fixed;
}
</style>

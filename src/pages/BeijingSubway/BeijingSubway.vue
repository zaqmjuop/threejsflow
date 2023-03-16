<template>
  <div class="absolute-div"></div>
  <Renderer
    ref="rendererC"
    antialias
    resize="window"
    :orbit-ctrl="{
      enableRotate: false,
      enablePan: false
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
      <StationList :stationList="BEIJING_STATION_DATA"></StationList>
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
  computed
} from 'vue'
import { useHoverTarget } from '@/use/useHoverTarget'
import { useSelect } from '@/use/useSelect'
import DragControll from '@/components/DragControll.vue'
import { useCameraStore } from '@/store/cameraStore'
import { DragControls } from '@/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import BloomCube from '@/components/BloomCube.vue'
import { useMultiSelect } from '@/use/useMultiSelect'
import { SelectionHelper } from '@/try/SelectionHelper'
import { SelectionBox } from '@/try/SelectionBox'

const cameraRef = shallowRef<typeof Camera | null>(null)
const sceneRef = shallowRef<typeof Scene | null>(null)
const rendererC = shallowRef<typeof Renderer | null>(null)
const state = shallowReactive({
  draging: false,
  enableOrbit: true,
  selecting: false
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
    orbitCtrl.value.enablePan = false //!disabled
    orbitCtrl.value.enableRotate = false //!disabled
  },
  { immediate: true }
)

provide('render', rendererC)
provide('scene', sceneRef)
provide('camera', cameraRef)

type Object3D = THREE.Object3D & {
  material: THREE.MeshBasicMaterial
}

let hoverTargetRef: ReturnType<typeof useHoverTarget> | null = null

const selecteds: THREE.Intersection<THREE.Object3D<THREE.Event>>[] =
  shallowReactive([])

provide('selecteds', selecteds)

onMounted(() => {
  const camera = cameraRef.value?.camera as THREE.PerspectiveCamera | null
  const scene = sceneRef.value?.scene as THREE.Scene | null
  const canvas = rendererC.value?.canvas
  const renderer: THREE.Renderer | undefined = rendererC.value?.renderer
  if (camera && scene && renderer) {
    const helper = new SelectionHelper(renderer, 'a')
    console.log(helper)
  }
  // if (camera && scene) {
  //   const multiStore = useMultiSelect({ camera, scene })
  //   watch(
  //     () => multiStore.state.selecting,
  //     () => {
  //       state.selecting = multiStore.state.selecting
  //     }
  //   )
  // }

  if (camera && scene && canvas instanceof HTMLCanvasElement) {
    hoverTargetRef = useHoverTarget({
      camera,
      scene
    })

    let prevObjectColor = -1

    const selector = useSelect({ camera, scene, domElement: canvas })

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

    watch(selector, (value) => {
      selecteds.forEach((item) => {
        item?.object.scale.set(1, 1, 1)
      })
      selecteds.splice(0, selecteds.length, ...selector)
      selecteds.forEach((item) => {
        item?.object.scale.set(1.1, 1.1, 1.1)
      })
    })
  }

  if (orbitCtrl.value) {
    watch(
      () => cameraStore.draging,
      (draging: boolean) => {
        orbitCtrl.value && (orbitCtrl.value.enableRotate = !draging)
      }
    )
  }
  // if (camera && scene && canvas) {
  //   const dragControls = new DragControls(scene.children, camera, canvas)
  //   dragControls.enabled = true

  //   // 监听拖拽事件并更新场景
  //   dragControls.addEventListener('dragstart', () => {
  //     state.draging = true
  //   })

  //   dragControls.addEventListener('dragend', () => {
  //     state.draging = false
  //   })
  // }
})

// 鼠标位置
// 摄像机位置 camera.getWorldPosition(v)
// 摄像机方向 camera.getWorldDirection(new THREE.Vector3(0,0,0))
</script>
<style scoped>
.absolute-div {
  position: fixed;
  left: 0;
  top: 0;
  color: #fff;
  text-shadow: 1px 1px #ff0000, -1px -1px #0000ff;
}
</style>

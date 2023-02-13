import { getPointerTarget } from '@/common/getPointerTarget'
import { Scene, Camera } from 'three'
import { shallowReactive } from 'vue'

export const usePointerDown = ({
  camera,
  scene
}: {
  camera: Camera
  scene: Scene
}) => {
  const targetState = shallowReactive<{
    value: THREE.Intersection<THREE.Object3D<THREE.Event>> | null
    event: PointerEvent | null
  }>({ value: null, event: null })
  const onPointerDown = (event: PointerEvent) => {
    targetState.value = getPointerTarget(event, camera, scene)
  }
  window.addEventListener('pointerdown', onPointerDown)
  return targetState
}

import { getPointerTarget } from '@/common/getPointerTarget'
import { Scene, Camera } from 'three'
import { shallowReactive } from 'vue'

export const usePointerDown = ({
  camera,
  scene,
  onPointerDown
}: {
  camera: Camera
  scene: Scene
  onPointerDown?: (event: PointerEvent) => void
}) => {
  const targetState = shallowReactive<{
    value: THREE.Intersection<THREE.Object3D<THREE.Event>> | null
    event: PointerEvent | null
  }>({ value: null, event: null })
  const handlePointerDown = (event: PointerEvent) => {
    targetState.value = getPointerTarget(event, camera, scene)
    onPointerDown?.(event)
  }
  window.addEventListener('pointerdown', handlePointerDown)
  return targetState
}

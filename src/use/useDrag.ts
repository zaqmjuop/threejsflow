import { Scene, Camera } from 'three'
import { shallowReactive } from 'vue'
import { usePointerDown } from './usePointerDown'
export const useDrag = ({
  camera,
  scene,
  uuid,
  onDragStart,
  onDragMove,
  onDragEnd
}: {
  camera: Camera
  scene: Scene
  uuid: string | number
  onDragStart?: (event: PointerEvent) => void
  onDragMove?: (event: PointerEvent) => void
  onDragEnd?: (event: PointerEvent) => void
}) => {
  const state = shallowReactive<{
    value: THREE.Intersection<THREE.Object3D<THREE.Event>> | null
    event: PointerEvent | null
  }>({
    value: null,
    event: null
  })

  const handlePointerMove = (event: PointerEvent) => {
    onDragMove?.(event)
  }

  const handlePointerUp = (event: PointerEvent) => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    onDragEnd?.(event)
  }

  const pointerDownState = usePointerDown({
    camera,
    scene,
    onPointerDown(event) {
      console.log(pointerDownState.value, uuid)
      if (pointerDownState.value?.object?.uuid !== uuid) {
        return
      }
      state.value = pointerDownState.value
      onDragStart?.(event)
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    }
  })

  return state
}

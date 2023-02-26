import { getParentByUUID } from '@/common/bubbleParent'
import { Scene, Camera, Object3D } from 'three'
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
  uuid: string
  onDragStart?: (event: PointerEvent) => void
  onDragMove?: (event: PointerEvent) => void
  onDragEnd?: (event: PointerEvent) => void
}) => {
  const state = shallowReactive<{
    value: Object3D | null
    event: PointerEvent | null
    pointerDownState: ReturnType<typeof usePointerDown> | null
  }>({
    value: null,
    event: null,
    pointerDownState: null
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
      let obj: Object3D | null = pointerDownState.value?.object || null
      if (!obj) {
        return
      }
      obj = getParentByUUID(obj, uuid)
      if (!obj) {
        return
      }
      state.value = obj
      onDragStart?.(event)
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    }
  })
  state.pointerDownState = pointerDownState

  return state
}

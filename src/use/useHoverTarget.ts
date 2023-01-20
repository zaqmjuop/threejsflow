import * as THREE from 'three'
import { onBeforeUnmount, ref, shallowRef } from 'vue'

export const useHoverTarget = ({
  camera,
  scene
}: {
  camera: THREE.Camera
  scene: THREE.Scene
}) => {
  const pointer = new THREE.Vector2(0, 0)
  const raycaster = new THREE.Raycaster()
  const hoverTarget = shallowRef<THREE.Intersection<
    THREE.Object3D<THREE.Event>
  > | null>(null)

  const onPointerMove = (event: PointerEvent) => {
    if (Date.now() % 16) {
      return
    }
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    //  左上角 -1， 1 右下角 1， -1
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const target = raycaster.intersectObjects(scene.children)[0] || null
    hoverTarget.value = target
  }
  window.addEventListener('pointermove', onPointerMove)

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onPointerMove)
  })
  return hoverTarget
}

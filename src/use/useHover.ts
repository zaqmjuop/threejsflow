import * as THREE from 'three'
import { onBeforeUnmount, reactive } from 'vue'

export const useHover = ({
  camera,
  scene
}: {
  camera: THREE.Camera
  scene: THREE.Scene
}) => {
  const pointer = new THREE.Vector3(0, 0, 0)
  const raycaster = new THREE.Raycaster()
  const state = {
    pointerX: 0,
    pointerY: 0,
    hovers: [] as THREE.Intersection<THREE.Object3D<THREE.Event>>[]
  }

  const onPointerMove = (event: PointerEvent) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    //  左上角 -1， 1 右下角 1， -1
    state.pointerX = (event.clientX / window.innerWidth) * 2 - 1
    state.pointerY = -(event.clientY / window.innerHeight) * 2 + 1
    pointer.x = pointer.x
    pointer.y = pointer.y

    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    state.hovers = intersects
    if (intersects.length > 1) {
      intersects.forEach((item) => {
        ;(item.object as any).material.color.setHex(0xff0000)
      })
    }
  }
  window.addEventListener('pointermove', onPointerMove)

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onPointerMove)
  })
  return state
}

import * as THREE from 'three'
import { onBeforeUnmount, shallowReactive } from 'vue'

export const useSelect = ({
  camera,
  scene,
  domElement
}: {
  camera: THREE.Camera
  scene: THREE.Scene
  domElement: HTMLCanvasElement
}) => {
  const pointer = new THREE.Vector2(0, 0)
  const raycaster = new THREE.Raycaster()
  const selecteds = shallowReactive<
    THREE.Intersection<THREE.Object3D<THREE.Event>>[]
  >([])
  let uuidRecord: { [key: string]: true } = {}

  const handleClick = (event: MouseEvent) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    //  左上角 -1， 1 右下角 1， -1
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const target = raycaster.intersectObjects(scene.children)[0] || null

    if (!event.shiftKey) {
      selecteds.splice(0, selecteds.length)
      uuidRecord = {}
    }
    const targetUUID = target.object.uuid
    if (!uuidRecord[targetUUID]) {
      selecteds.push(target)
      uuidRecord[targetUUID] = true
    }
  }
  domElement.addEventListener('click', handleClick)

  onBeforeUnmount(() => {
    domElement.removeEventListener('click', handleClick)
  })
  return selecteds
}

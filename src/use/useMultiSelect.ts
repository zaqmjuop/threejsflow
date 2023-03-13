import { shallowReactive } from 'vue'
import {
  Scene,
  Camera,
  Matrix4,
  Vector3,
  Box3,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry
} from 'three'

export const useMultiSelect = ({
  camera,
  scene
}: {
  camera: Camera
  scene: Scene
}) => {
  const state = shallowReactive({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    selecting: false
  })
  const handlePointerDown = (event: PointerEvent) => {
    if (!event.shiftKey) {
      return
    }
    state.selecting = true
    state.x1 = (event.clientX / window.innerWidth) * 2 - 1
    state.y1 = -(event.clientY / window.innerHeight) * 2 + 1
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }
  const handlePointerMove = (event: PointerEvent) => {}
  const handlePointerUp = (event: PointerEvent) => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    state.x2 = (event.clientX / window.innerWidth) * 2 - 1
    state.y2 = -(event.clientY / window.innerHeight) * 2 + 1

    // 计算矩形的边界
    const mouseBox = new Box3()
    const point1 = new Vector3(state.x1, state.y1, 0)
    let point2 = new Vector3(state.x2, state.y2, 0)
    point1.unproject(camera)
    point2.unproject(camera)

    const cameraDirection = new Vector3() // 定义一个方向向量
    camera.getWorldDirection(cameraDirection) // 获取摄像机方向，赋值给方向向量
    const distance = 2000 // 移动距离
    point2 = point2.add(cameraDirection.multiplyScalar(distance))

    mouseBox.setFromPoints([point1, point2])

    const intersects: any[] = []
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        const childBox = new Box3().setFromObject(child)
        if (childBox.intersectsBox(mouseBox)) {
          intersects.push(child)
        }
      }
    })
    console.log(intersects)
    state.selecting = false
  }
  window.addEventListener('pointerdown', handlePointerDown)
  return {
    state
  }
}

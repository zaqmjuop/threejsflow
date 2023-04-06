import { Raycaster, Vector2, Scene, Camera } from 'three'
const raycaster = new Raycaster()
const pointer = new Vector2()

export const getPointerTarget = (
  event: PointerEvent,
  camera: Camera,
  scene: Scene
) => {
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  //  左上角 -1， 1 右下角 1， -1
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const target = raycaster.intersectObjects(scene.children)[0] || null
  return target
}

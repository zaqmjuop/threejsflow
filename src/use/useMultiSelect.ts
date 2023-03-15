import { shallowReactive } from 'vue'
import {
  Scene,
  Camera,
  Matrix4,
  Vector2,
  Vector3,
  Box2,
  Box3,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  Frustum,
  Color,
  Box3Helper
} from 'three'

// 获取物体在屏幕上的位置
function getScreenPosition(
  obj: Mesh,
  camera: Camera,
  width: number,
  height: number
) {
  const vector = new Vector3()

  vector.setFromMatrixPosition(obj.matrixWorld)
  vector.project(camera)

  vector.x = (vector.x * 0.5 + 0.5) * width
  vector.y = (vector.y * 0.5 + 0.5) * height
  return new Vector2(vector.x, vector.y)
}

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
    state.x1 = event.clientX
    state.y1 = event.clientY
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }
  const handlePointerMove = (event: PointerEvent) => {}
  const handlePointerUp = (event: PointerEvent) => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    state.x2 = event.clientX
    state.y2 = event.clientY

    if (state.x2 < state.x1) {
      const tmp = state.x2
      state.x2 = state.x1
      state.x1 = tmp
    }
    if (state.y2 < state.y1) {
      const tmp = state.y2
      state.y2 = state.y1
      state.y1 = tmp
    }

    const frustum = new Frustum()
    frustum.setFromProjectionMatrix(
      new Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    )

    const box = new Box3()

    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        box.setFromObject(obj)
        const isIntersect = frustum.intersectsBox(box)
        if (isIntersect) {
          const point = getScreenPosition(
            obj,
            camera,
            window.innerWidth,
            window.innerHeight
          )

          const include =
            state.x1 <= point.x &&
            point.x <= state.x2 &&
            state.y1 <= point.y &&
            point.y <= state.y2
          if (include) {
            obj.material.color.setHex(0xff0000)
          }
        }
      }
    })

    state.selecting = false
  }
  window.addEventListener('pointerdown', handlePointerDown)
  return {
    state
  }
}

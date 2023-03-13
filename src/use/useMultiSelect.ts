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
    selecting: false,
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

    const frustumSize = 1000
    const aspect = window.innerWidth / window.innerHeight
    const near = 1
    const far = 2000
    const projectionMatrix = new Matrix4()
    projectionMatrix.makeOrthographic(
      -frustumSize / 2,
      frustumSize / 2,
      frustumSize / (2 * aspect),
      -frustumSize / (2 * aspect),
      near,
      far
    )
    const world1 = new Vector3(state.x1, state.y1, 0.5)
      .applyMatrix4(projectionMatrix)
      .applyMatrix4(camera.matrixWorld)
    const world2 = new Vector3(state.x2, state.y2, 0.5)
      .applyMatrix4(projectionMatrix)
      .applyMatrix4(camera.matrixWorld)
    // const world3 = new Vector3(state.x2, state.y1, 0.5)
    //   .applyMatrix4(projectionMatrix)
    //   .applyMatrix4(camera.matrixWorld)
    // const world4 = new Vector3(state.x1, state.y2, 0.5)
    //   .applyMatrix4(projectionMatrix)
    //   .applyMatrix4(camera.matrixWorld)

    const geometry = new BoxGeometry(
      Math.abs(world1.x - world2.x),
      Math.abs(world1.y - world2.y),
      1
    )
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2
    })
    const mesh = new Mesh(geometry, material)
    mesh.position.copy(camera.position)
    mesh.lookAt(camera.getWorldDirection(new Vector3()).add(camera.position))
    scene.add(mesh)

    const intersects: any[] = []
    scene.traverse((obj) => {
      if ((obj as any).isMesh) {
        const box = new Box3().setFromObject(obj)
        const boundingBox = mesh.geometry.boundingBox
        if (boundingBox && box.intersectsBox(boundingBox)) {
          intersects.push(obj)
        }
      }
    })
    scene.remove(mesh)
    console.log(intersects)
    state.selecting = false
  }
  window.addEventListener('pointerdown', handlePointerDown)
  return {
    state
  }
}

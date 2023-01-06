import * as THREE from 'three'
import BeijingCamera from '@/components/BeijingCamera'
import MyCube from '@/components/MyCube'
import BeijingFloor from '@/components//BeijingFloor'
import { getCanvasSize } from '@/common/getCanvasSize'

export default (props: { container: HTMLElement }) => {
  const scene = new THREE.Scene()

  const canvasSize = getCanvasSize()

  const beijingCamera = BeijingCamera({
    width: canvasSize.width,
    height: canvasSize.height,
    container: props.container
  })
  beijingCamera.setup()

  const cube = MyCube()
  scene.add(cube.mesh)
  cube.setup()
  const floor = BeijingFloor()
  scene.add(floor.mesh)
  floor.setup()

  return { scene, camera: beijingCamera.camera }
}

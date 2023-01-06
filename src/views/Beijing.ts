import * as THREE from 'three'
import MyCamera from '@/components/MyCamera'
import MyCube from '@/components/MyCube'

export default () => {
  const scene = new THREE.Scene()
  const { camera } = MyCamera()
  camera.position.z = 5
  const cube = MyCube()
  scene.add(cube.mesh)
  cube.setup()

  return { scene, camera }
}

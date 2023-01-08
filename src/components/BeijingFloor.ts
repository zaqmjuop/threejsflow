import * as THREE from 'three'
export default () => {
  const geometry = new THREE.PlaneGeometry(400, 400)

  const material = new THREE.MeshBasicMaterial({
    color: 0xdddddd,
    side: THREE.DoubleSide
  })
  const floor = new THREE.Mesh(geometry, material)

  const setup = () => {
    floor.position.set(0, 0, 0)
    floor.rotation.set(Math.PI / 2, 0, 0)
  }

  return { mesh: floor, setup }
}

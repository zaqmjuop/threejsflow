import * as THREE from 'three'
export default () => {
  const geometry = new THREE.BoxGeometry(10, 10, 10)

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)

  const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  const setup = () => {
    // animate()
    cube.position.set(20, 0,0 )
  }

  return { mesh: cube, setup }
}

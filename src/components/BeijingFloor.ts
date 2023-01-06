import * as THREE from 'three'
export default () => {
  const geometry = new THREE.PlaneGeometry( 1, 1 );

  const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  const floor = new THREE.Mesh(geometry, material)

  const animate = () => {
    requestAnimationFrame(animate)
    floor.rotation.x += 0.01
    floor.rotation.y += 0.01
  }

  const setup = () => {
    animate()
  }

  return { mesh: floor, setup }
}

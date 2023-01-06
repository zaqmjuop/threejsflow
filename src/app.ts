import * as THREE from 'three'
import Beijing from '@/views/Beijing'
export default () => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  const beijing = Beijing()
  renderer.render(beijing.scene, beijing.camera)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(beijing.scene, beijing.camera)
  }

  const setup = () => {
    animate()
  }

  return { renderer, animate, setup }
}

import * as THREE from 'three'
import Beijing from '@/views/Beijing'
import { getCanvasSize } from './common/getCanvasSize'

export default () => {
  const renderer = new THREE.WebGLRenderer()

  const beijing = Beijing({ container: renderer.domElement })
  renderer.render(beijing.scene, beijing.camera)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(beijing.scene, beijing.camera)
  }

  const resize = () => {
    const canvasSize = getCanvasSize()
    renderer.setSize(canvasSize.width, canvasSize.height)
  }

  const handleResize = () => {
    resize()
  }

  const setup = () => {
    animate()
  }

  const mounted = () => {
    resize()
    window.addEventListener('resize', handleResize)
  }

  return { renderer, animate, setup, resize, mounted }
}

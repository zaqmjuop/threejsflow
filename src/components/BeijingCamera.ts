import { getDegVal } from '@/common/getDegVal'
import * as THREE from 'three'
export default (props: {
  width: number
  height: number
  container: HTMLElement
}) => {
  const camera = new THREE.PerspectiveCamera(
    60,
    props.width / props.height,
    1,
    1000
  )

  const rorateStepDeg = getDegVal(5)
  const mouseRorateStep = getDegVal(0.1)

  const reset = () => {
    camera.position.set(50, 180, 400) //设置相机位置
    camera.rotation.set(-getDegVal(20), getDegVal(15), 0)
  }

  const xmove = (changeVar: number) => {
    camera.position.setX(camera.position.x + changeVar)
  }

  const ymove = (changeVar: number) => {
    camera.position.setY(camera.position.y + changeVar)
  }

  const zmove = (changeVar: number) => {
    camera.position.setZ(camera.position.z + changeVar)
  }

  const handleKeyup = (event: KeyboardEvent) => {
    if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      switch (event.key) {
        case 'i':
          zmove(-1) // 向前移动
          break
        case 'k':
          zmove(1) // 向后移动
          break
        case 'j':
          xmove(-1) // 向左移动
          break
        case 'l':
          xmove(1) // 向右移动
          break
        case 'h':
          camera.rotateY(rorateStepDeg) // 左旋转
          break
        case ';':
          camera.rotateY(-rorateStepDeg) // 右旋转
          break
        case 'u':
          ymove(1) // 向上移动// 向上移动
          break
        case 'm':
          ymove(-1) // 向下移动
          break
        case 'o':
          camera.rotateX(0.1) // 向上旋转
          break
        case '.':
          camera.rotateX(-0.1) // 向下旋转
          break
        case ',':
          reset() // 复位
          break
        default:
          break
      }
    }
  }

  const handleMouseDown = () => {
    props.container.addEventListener('mousemove', handleMouseMove)
    props.container.addEventListener('mouseup', handleMouseUp)
  }
  const uninstHandleMouse = () => {
    props.container.removeEventListener('mousemove', handleMouseMove)
    props.container.removeEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = (event: MouseEvent) => {
    if (event.buttons === 0) {
      return uninstHandleMouse()
    }
    if (event.movementX) {
      const dirX = event.movementX > 0 ? 1 : -1
      camera.rotateY(-dirX * mouseRorateStep) // x旋转
    }
    if (event.movementY) {
      const dirY = event.movementY > 0 ? 1 : -1
      camera.rotateX(-dirY * mouseRorateStep) // x旋转
    }
  }
  const handleMouseUp = () => {
    uninstHandleMouse()
  }

  const handleWheel = (event: WheelEvent) => {
    if (!event.deltaY) {
      return
    }
    const dir = event.deltaY > 0 ? 1 : -1
    zmove(dir * 4)
  }

  const setup = () => {
    reset()
    document.body.addEventListener('keydown', handleKeyup)
    props.container.addEventListener('mousedown', handleMouseDown)
    props.container.addEventListener('wheel', handleWheel)
  }

  return { camera, setup }
}
// TODO
// 位置移动时应该考虑当前朝向
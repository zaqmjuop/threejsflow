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

  const rarateStepDeg = Math.PI / 36

  const reset = () => {
    camera.position.set(50, 50, 150) //设置相机位置
    camera.rotation.set(0, 0, 0)
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
          camera.rotateY(rarateStepDeg) // 左旋转
          break
        case ';':
          camera.rotateY(-rarateStepDeg) // 右旋转
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

  const setup = () => {
    reset()
    document.body.addEventListener('keydown', handleKeyup)
  }

  return { camera, setup }
}

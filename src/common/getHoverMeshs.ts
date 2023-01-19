import { Raycaster, Vector2 } from 'three'
const raycaster = new Raycaster()
const pointer = new Vector2()

// function onPointerMove(event: { clientX: number; clientY: number }) {
//   // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
// }

// function render() {
//   // 通过摄像机和鼠标位置更新射线
//   raycaster.setFromCamera(pointer, camera)

//   // 计算物体和射线的焦点
//   const intersects = raycaster.intersectObjects(scene.children)

//   for (let i = 0; i < intersects.length; i++) {
//     intersects[i].object.material.color.set(0xff0000)
//   }

//   renderer.render(scene, camera)
// }

// window.addEventListener('pointermove', onPointerMove)

// window.requestAnimationFrame(render)
// 鼠标位置
// 摄像机位置
// 摄像机方向
export const getHoverMeshs = () => {

}
import * as THREE from 'three'
import BeijingCamera from '@/components/BeijingCamera'
import MyCube from '@/components/MyCube'
import BeijingFloor from '@/components//BeijingFloor'
import { getCanvasSize } from '@/common/getCanvasSize'
import BeijingStationList from '@/views/BeijingSubway/BeijingStationList'
import { BEIJING_STATION_DATA } from '@/constant/BeijingStationData'

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
  const stationList = BeijingStationList({ stationList: BEIJING_STATION_DATA })

  stationList.vnodes.forEach((stationVnode) => scene.add(stationVnode.mesh))
  stationList.setup()

  const floor = BeijingFloor()
  scene.add(floor.mesh)
  floor.setup()

  return { scene, camera: beijingCamera.camera }
}

import * as THREE from 'three'
import { Station } from '@/type/BeijingSubway'

interface Props {
  stationList: Station[]
}

export default (props: Props) => {
  const vnodes = props.stationList.map((itemData) => {
    const geometry = new THREE.CapsuleGeometry(5, 10, 16, 32)
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      opacity: 0.7,
      side: THREE.DoubleSide,
      flatShading: true
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(
      itemData.position.x,
      itemData.position.y,
      itemData.position.z
    )
    return { mesh }
  })

  const setup = () => {}

  return {
    vnodes,
    setup
  }
}

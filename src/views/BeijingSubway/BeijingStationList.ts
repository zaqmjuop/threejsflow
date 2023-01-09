import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import YaHei_Regular from '@/assets/Microsoft-YaHei-Regular.json'
import * as THREE from 'three'
import { Station } from '@/type/BeijingSubway'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

interface Props {
  stationList: Station[]
}

const loader = new FontLoader()
const font = loader.parse(YaHei_Regular)

export default (props: Props) => {
  const vnodes = props.stationList.map((itemData) => {
    const group = new THREE.Group()
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
    group.add(mesh)

    const stationGeometry = new TextGeometry(itemData.stationName, {
      font,
      size: 5, // 大小
      height: 0 // 是否是立体的文字，如果是2d的显示就设置0mmmmmmmmmmmmmmmmmmm
    })

    const textMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
      wireframe: false,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    })

    const stationLabel = new THREE.Mesh(stationGeometry, textMaterial)
    stationLabel.position.set(
      itemData.position.x - 10,
      itemData.position.y + 10,
      itemData.position.z
    )

    group.add(stationLabel)

    return { group }
  })

  const setup = () => {}

  return {
    vnodes,
    setup
  }
}

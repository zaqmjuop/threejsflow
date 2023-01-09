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
  const vnodes = props.stationList.map((itemData, itemIndex) => {
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
      height: 0
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

    if (itemIndex) {
      const prevItem = props.stationList[itemIndex - 1]
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          prevItem.position.x,
          prevItem.position.y,
          prevItem.position.z
        ),
        new THREE.Vector3(
          itemData.position.x,
          itemData.position.y,
          itemData.position.z
        )
      ])
      // const path = new CustomSinCurve(10)
      const lineGeometry = new THREE.TubeGeometry(curve, 10, 2, 4, false)
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x30b030 })
      const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial)
      group.add(lineMesh)
    }

    return { group }
  })

  const setup = () => {}

  return {
    vnodes,
    setup
  }
}

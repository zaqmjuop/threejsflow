import { BufferGeometry } from 'three/src/core/BufferGeometry'
import { Float32BufferAttribute } from 'three/src/core/BufferAttribute'
import { PolyhedronGeometry } from 'three'
const DEFAULT = {
  indices: [0, 2, 1, 2, 3, 1],
  vertices: [-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvs: [0, 1, 1, 1, 0, 0, 1, 0],
  gridX: 1,
  gridY: 1
} as const
type TriangleGeometryParameters = {
  width: number
  height: number
  widthSegments: number
  heightSegments: number
}

class TriangleGeometry extends BufferGeometry {
  parameters: TriangleGeometryParameters
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    super()

    this.type = 'TriangleGeometry'

    this.parameters = {
      width: width,
      height: height,
      widthSegments: widthSegments,
      heightSegments: heightSegments
    }

    const width_half = width / 2
    const height_half = height / 2

    const gridX = Math.floor(widthSegments)
    const gridY = Math.floor(heightSegments)

    const gridX1 = gridX + 1
    const gridY1 = gridY + 1

    const segment_width = width / gridX
    const segment_height = height / gridY

    //

    const indices = []
    const vertices = [] // 顶点[x,y,z...] [-1,1]
    const normals = [] // [0,0,1 ...]
    const uvs = [] // [x, y,...]

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segment_height - height_half

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segment_width - width_half

        vertices.push(x, -y, 0)

        normals.push(0, 0, 1)

        uvs.push(ix / gridX)
        uvs.push(1 - iy / gridY)
      }
    }

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy
        const b = ix + gridX1 * (iy + 1)
        const c = ix + 1 + gridX1 * (iy + 1)
        const d = ix + 1 + gridX1 * iy

        indices.push(a, b, d)
        indices.push(b, c, d)
      }
    }
    console.log({ indices, vertices, normals, uvs, gridX, gridY })

    this.setIndex(indices)
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3))
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  }

  static fromJSON(data: TriangleGeometryParameters) {
    return new TriangleGeometry(
      data.width,
      data.height,
      data.widthSegments,
      data.heightSegments
    )
  }
}

export { TriangleGeometry }

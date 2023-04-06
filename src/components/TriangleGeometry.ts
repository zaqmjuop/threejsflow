import { BufferGeometry } from 'three/src/core/BufferGeometry'
import { Float32BufferAttribute } from 'three/src/core/BufferAttribute'

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

    const indices = [0, 2, 1, 2, 3, 1]
    const vertices = [0, 0, 0, width, 0, 0, 0, -height, 0] // 顶点[x,y,z...] [-1,1]
    const normals = vertices.slice()
    const uvs = [0, 0, 0, 1, 1, 0]

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

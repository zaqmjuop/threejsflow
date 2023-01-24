import { TriangleGeometry } from '@/components/TriangleGeometry'
import { meshComponent } from './Mesh'

const props = {
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  widthSegments: { type: Number, default: 1 },
  heightSegments: { type: Number, default: 1 }
} as const

const createGeometry = (comp: any) => {
  return new TriangleGeometry(
    comp.width,
    comp.height,
    comp.widthSegments,
    comp.heightSegments
  )
}

const Triangle = meshComponent('Triangle', props, createGeometry)
export default Triangle
// import { meshComponent } from 'troisjs/src/meshes/Mesh'
// //  troisjs\src\geometries\PlaneGeometry.ts
// import { geometryComponent } from './Geometry'
// import { PlaneGeometry } from 'three'

// export const props = {
//   width: { type: Number, default: 1 },
//   height: { type: Number, default: 1 },
//   widthSegments: { type: Number, default: 1 },
//   heightSegments: { type: Number, default: 1 },
// } as const

// export function createGeometry(comp: any): PlaneGeometry {
//   return new PlaneGeometry(comp.width, comp.height, comp.widthSegments, comp.heightSegments)
// }

// export default geometryComponent('PlaneGeometry', props, createGeometry)

// // troisjs\src\meshes\Plane.ts
// import { meshComponent } from './Mesh'
// import { props, createGeometry } from '../geometries/PlaneGeometry'

// export default meshComponent('Plane', props, createGeometry)

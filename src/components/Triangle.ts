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
import { Object3D } from 'three'
export const getParentByUUID = (target: Object3D, uuid: string) => {
  let obj: Object3D | null = target
  while (obj && obj.uuid !== uuid) {
    obj = obj.parent
  }
  return obj
}

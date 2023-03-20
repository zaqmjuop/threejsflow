import { PerspectiveCamera, Scene, Renderer } from 'three'
import { SelectionHelper } from '@/try/SelectionHelper'
import { SelectionBox } from '@/try/SelectionBox'
import { shallowReactive } from 'vue'

export const useMultiSelect = (payload: {
  camera: PerspectiveCamera
  scene: Scene
  renderer: Renderer
}) => {
  const selectionBox = new SelectionBox(payload.camera, payload.scene)
  const helper = new SelectionHelper(payload.renderer, 'selectBox')

  const originColors = shallowReactive<Record<string, number>>({})

  const backColor = (target: any) => {
    const uuid = target.uuid
    const originColor = originColors[uuid]
    if (originColor !== undefined) {
      target.material.color.setHex(originColor)
    }
    delete originColors[uuid]
  }

  document.addEventListener('pointerdown', (event: PointerEvent) => {
    for (const item of selectionBox.collection) {
      backColor(item)
    }

    selectionBox.startPoint.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    )
  })

  document.addEventListener('pointermove', (event: PointerEvent) => {
    if (helper.isDown) {
      const collection = selectionBox.collection
      for (let i = 0; i < collection.length; i++) {
        backColor(collection[i])
      }

      selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      )

      const allSelected = selectionBox.select()

      for (let i = 0; i < allSelected.length; i++) {
        const uuid = allSelected[i].uuid
        if (originColors[uuid] === undefined) {
          const color = allSelected[i].material.color.getHex()
          originColors[uuid] = color
        }
        allSelected[i].material.color.setHex(0xffffff)
      }
    }
  })

  document.addEventListener('pointerup', (event: PointerEvent) => {
    selectionBox.endPoint.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    )

    const allSelected = selectionBox.select()

    for (let i = 0; i < allSelected.length; i++) {
      backColor(allSelected[i])
    }
  })
}

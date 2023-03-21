import { PerspectiveCamera, Scene, Renderer } from 'three'
import { SelectionHelper } from '@/try/SelectionHelper'
import { SelectionBox } from '@/try/SelectionBox'
import { shallowReactive } from 'vue'

export const useMultiSelect = (payload: {
  camera: PerspectiveCamera
  scene: Scene
  renderer: Renderer
}) => {
  const domElement = payload.renderer.domElement

  const selectionBox = new SelectionBox(payload.camera, payload.scene)
  const helper = new SelectionHelper(payload.renderer, 'selectBox')

  const originColors = shallowReactive<Record<string, number>>({})

  const state = shallowReactive({
    selecting: false
  })

  const backColor = (target: any) => {
    const uuid = target.uuid
    const originColor = originColors[uuid]
    if (originColor !== undefined) {
      target.material.color.setHex(originColor)
    }
    delete originColors[uuid]
  }

  const handleDown = (event: PointerEvent) => {
    for (const item of selectionBox.collection) {
      backColor(item)
    }
    if (event.shiftKey) {
      state.selecting = true

      helper.onPointerDown(event)

      selectionBox.startPoint.set(
        (event.clientX / domElement.width) * 2 - 1,
        -(event.clientY / domElement.height) * 2 + 1,
        0.5
      )
    }
  }

  const handleMove = (event: PointerEvent) => {
    if (!state.selecting) {
      return
    }
    if (!event.shiftKey) {
      return handleUp(event)
    }

    helper.onPointerMove(event)

    const collection = selectionBox.collection
    for (let i = 0; i < collection.length; i++) {
      backColor(collection[i])
    }

    selectionBox.endPoint.set(
      (event.clientX / domElement.width) * 2 - 1,
      -(event.clientY / domElement.height) * 2 + 1,
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

  const handleUp = (event: PointerEvent) => {
    helper.onPointerUp()
    selectionBox.endPoint.set(
      (event.clientX / domElement.width) * 2 - 1,
      -(event.clientY / domElement.height) * 2 + 1,
      0.5
    )

    const allSelected = selectionBox.select()

    for (let i = 0; i < allSelected.length; i++) {
      backColor(allSelected[i])
    }
    state.selecting = false
  }

  domElement.addEventListener('pointerdown', handleDown)
  domElement.addEventListener('pointermove', handleMove)
  domElement.addEventListener('pointerup', handleUp)
  return { state }
}

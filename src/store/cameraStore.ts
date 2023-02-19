import { defineStore } from 'pinia'

export const useCameraStore = defineStore('cameraStore', {
  state: () => {
    return {
      dragStart: null as null | PointerEvent
    }
  },
  getters: {
    draging: (state) => {
      return !!state.dragStart
    }
  }
})

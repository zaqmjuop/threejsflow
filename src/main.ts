import './style.css'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import * as THREE from 'three'
import { createPinia } from 'pinia'

if (!location.pathname.endsWith('/')) {
  location.pathname += '/'
} else if (!WebGL.isWebGLAvailable()) {
  const warning = WebGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
} else {
  (window as any).THREE = THREE
  const app = createApp(App)
  app.use(createPinia())

  app.use(router)

  app.mount('#app')
  window.THREE = THREE
}

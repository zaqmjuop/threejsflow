import './style.css'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import * as THREE from 'three'

if (!location.pathname.endsWith('/')) {
  location.pathname += '/'
} else if (!WebGL.isWebGLAvailable()) {
  const warning = WebGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
} else {
  const app = createApp(App)

  app.use(router)

  app.mount('#app')
  window.THREE = THREE
}

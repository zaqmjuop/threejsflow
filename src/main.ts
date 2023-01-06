import './style.css'
import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
import App from './app'

if (!WebGL.isWebGLAvailable()) {
  const warning = WebGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
} else {
  const app = App()
  document.body.appendChild(app.renderer.domElement)
  app.setup()
}

import './style.css'
// import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
// import App from './app'

// const mounted = () => {
//   if (!WebGL.isWebGLAvailable()) {
//     const warning = WebGL.getWebGLErrorMessage()
//     document.body.appendChild(warning)
//   } else {
//     const app = App()
//     document.body.appendChild(app.renderer.domElement)
//     app.setup()
//     app.mounted()
//   }
// }

// mounted()
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'

if (!location.pathname.endsWith('/')) {
  location.pathname += '/'
} else {
  const app = createApp(App)

  app.use(router)

  app.mount('#app')
}

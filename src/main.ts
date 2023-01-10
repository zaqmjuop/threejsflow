// import './style.css'
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

createApp(App).mount('#app')
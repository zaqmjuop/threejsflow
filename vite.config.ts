import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

let buildType = 'docs'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  server: {
    port: 3000,
    watch: {
      ignored: ['!**/node_modules/@zaqmjuop/threejsflow/dist/threejsflow.mjs']
    }
  },
  optimizeDeps: {
    exclude: ['@zaqmjuop/threejsflow']
  },
  build: {
    outDir: buildType === 'lib' ? 'dist' : 'docs',
    lib:
      buildType === 'lib'
        ? {
            entry: path.resolve(__dirname, 'lib/threejsflow.ts'),
            name: 'threejsflow',
            formats: ['es'],
            fileName: 'threejsflow'
          }
        : void 0
  },
  base: 'threejsflow', // git-page 基础路径
  preview: {
    port: 8080
  }
})

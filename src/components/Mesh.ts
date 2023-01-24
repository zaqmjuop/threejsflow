import { BufferGeometry, Mesh } from 'troisjs'

import { ComponentPropsOptions, defineComponent } from 'vue'

export function meshComponent<P extends Readonly<ComponentPropsOptions>>(
  name: string,
  props: P,
  createGeometry: { (c: any): any }
) {
  return defineComponent({
    name,
    extends: Mesh,
    props,
    created() {
      this.createGeometry()
      this.addGeometryWatchers(props)
    },
    methods: {
      createGeometry() {
        this.geometry = createGeometry(this)
      }
    }
  })
}

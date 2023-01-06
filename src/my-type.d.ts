declare interface LifeCircle{
  setup?: () => any
  beforeMount?: () => any
  mounted?: () => any
  beforeUnmount?: () => any
}

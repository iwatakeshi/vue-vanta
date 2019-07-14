import * as components from './components'

const ComponentLibary = {
  install(Vue) {
    // components
    Object.keys(components).forEach(name => {
      Vue.component(name, components[name])
    })
  }
}

export default ComponentLibary

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibary)
}
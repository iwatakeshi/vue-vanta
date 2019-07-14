<template>
  <div>
    <div
      :id="`${vantaId}`"
      v-if="enabled"
    >
      <slot />
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueVanta',
  props: {
    effect: {
      type: String,
      default: () => 'birds'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    src: {
      type: String,
      default: () => 'http://iwatakeshi.github.io/js/vanta'
    },
    vantaId: {
      type: String,
      default: () => 'vanta-1'
    },
    enabled: {
      type: Boolean,
      default: () => true
    }
  },
  beforeMount () {
    if (this.enabled) {
      this.setup()
    }
  },
  methods: {
    setup () {
      // Normalize the url
      const normalize = string =>
        string.substr(-1) === '/'
          ? string.substr(0, string.length - 1)
          : string
      const url = normalize(this.src)

      // Create the script
      const threejs = document.createElement('script')
      threejs.async = true
      threejs.defer = true
      threejs.id = 'three'
      threejs.src = `${url}/three.r92.min.js`
      document.head.appendChild(threejs)
      // Load the script
      threejs.onload = () => {
        const vantaScript = document.createElement('script')
        vantaScript.async = true
        vantaScript.defer = true
        vantaScript.id = 'vanta'
        vantaScript.src = `${url}/vanta.${this.effect}.min.js`
        document.head.appendChild(vantaScript)
        vantaScript.onload = () => {
          window.VANTA[this.effect.toUpperCase()](
            Object.assign(this.options, {
              el: `#${this.vantaId}`
            })
          )
        }
      }
    }
  }
}
</script>

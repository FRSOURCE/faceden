<template>
  <ViewSwitch :class="$style['main-content']" />
</template>

<script lang="ts">
import ViewSwitch from '@/components/ViewSwitch.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'App',
  components: {
    ViewSwitch
  }
})

</script>

<style lang="scss" src='../node_modules/reset-css/sass/_reset.scss'></style>

<style lang="scss">
body {
  box-sizing: border-box;
  padding: 10vh 0 5vh;
  min-height: 100vh;
  line-height: 1.2;
  background-color: #000;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0eff6e;
  text-align: center;
}

p {
  line-height: 1.7;
}

small {
  font-size: 0.5em;
}

button {
  margin: 3rem 0 1rem;
  border: 0;
  padding: 15px;
  font: inherit;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  color: #fff;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;

  &:hover {
    color: #000;
    background-color: #0eff6e;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>

<style lang="scss" module>
.main-content {
  max-width: 600px;
  margin: 0 auto;
}
</style>

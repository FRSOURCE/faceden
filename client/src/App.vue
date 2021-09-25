<template>
  <ViewSwitch :class="$style['main-content']" />
</template>

<script lang="ts">
import ViewSwitch from '@/components/ViewSwitch.vue'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'App',
  components: {
    ViewSwitch
  }
})

</script>

<style lang="scss" src='../node_modules/reset-css/sass/_reset.scss'></style>

<style lang="scss">
button {
  -webkit-appearance: none;
  appearance: none;
  font: inherit;

  &:focus {
    outline: none;
  }
}

body {
  min-height: 100vh;
  line-height: 1.2;
  background-color: #000;
  font-family: 'Inter', sans-serif;
  color: #0eff6e;
}

small {
  font-size: 0.5em;
}

button:disabled {
  opacity: 0.8;
  pointer-events: none;
}
</style>

<style lang="scss" module>
.main-content {
  max-width: 600px;
  margin: 0 auto;;
}
</style>
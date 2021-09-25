<script lang="ts">
import { defineComponent } from 'vue'
import ViewSwitch from '@/components/ViewSwitch.vue'

export default defineComponent({
  name: 'App',
  components: {
    ViewSwitch
  }
})
</script>

<template>
  <ViewSwitch />
</template>

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
  background-color: #000;
  font-family: 'Inter', sans-serif;
  color: #0eff6e;
}
</style>

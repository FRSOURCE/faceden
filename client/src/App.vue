<script lang="ts">
import { defineComponent } from 'vue'
import ViewSwitch from '@/components/ViewSwitch.vue'
import Form from './components/Form.vue'

export default defineComponent({
  name: 'App',
  components: {
    Form,
    ViewSwitch
  },
  setup() {
    const array = [{id:1, question:'uno'},{id:2, question:'due'},{id:3, question:'tre'},{id:4, question:'quatro'},{id:5, question:'cinque'},{id:6, question:'sei'},{id:7, question:'sette'},{id:8, question:'otto'} ,{id:9, question:'nove'},{id:10, question:'dieci'}]
    return {
      array
    }
  }
})

</script>

<template>
  <ViewSwitch />
  <Form :array="array" />
</template>

<style lang="scss" src='../node_modules/reset-css/sass/_reset.scss'></style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0eff6e;
  margin-top: 60px;
  background-color: #000000;
}

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
</style>

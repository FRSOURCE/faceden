<script lang="ts">
import Form from './components/Form.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Form
  },
  setup() {
    const array = ['uno', 'due', 'tre', 'quatro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci']
    return {
      array
    }
  }
})

</script>

<template>
  <Form :array="array" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0eff6e;
  margin-top: 60px;
  background-color: #000000;
}
</style>

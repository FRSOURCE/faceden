<script lang="ts">
import Form from './components/Form.vue'
import StartingScreen from './components/StartingScreen.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Form,
    StartingScreen
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
  <section>
    <StartingScreen />
    <Form :array="array" />
  </section>
</template>

<style lang="scss" src='../node_modules/reset-css/sass/_reset.scss'></style>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #0eff6e;
}
</style>

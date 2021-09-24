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
    const array = ['uno', 'due', 'tre', 'quatro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci']
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

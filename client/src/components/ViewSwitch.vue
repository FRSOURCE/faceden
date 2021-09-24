<script lang="ts">
import { defineComponent, ref } from 'vue'
import StartingScreen from '@/components/StartingScreen.vue'
import ChosenTeamView from '@/components/ChosenTeamView.vue'
import Form from '@/components/Form.vue'

enum Screen {
  StartingScreen,
  ChosenTeamView,
  Form
}

export default defineComponent({
  name: 'Main',
  components: {
    StartingScreen,
    ChosenTeamView,
    Form
  },
  setup () {
    const visibleScreen = ref(Screen.StartingScreen)
    const array = [{id:1, question:'uno'},{id:2, question:'due'},{id:3, question:'tre'},{id:4, question:'quatro'},{id:5, question:'cinque'},{id:6, question:'sei'},{id:7, question:'sette'},{id:8, question:'otto'} ,{id:9, question:'nove'},{id:10, question:'dieci'}]
    const navigate = (name: keyof typeof Screen) => {
      visibleScreen.value = Screen[name]
    }
    return {
      visibleScreen,
      Screen,
      navigate,
      array
    }
  }
})
</script>

<template>
  <div>
    <StartingScreen v-if="visibleScreen === Screen.StartingScreen" @navTo="navigate" />
    <Form :array="array" v-else-if="visibleScreen === Screen.Form" />
    <ChosenTeamView  v-else-if="visibleScreen === Screen.ChosenTeamView" />
  </div>
</template>


<style lang="scss">

</style>

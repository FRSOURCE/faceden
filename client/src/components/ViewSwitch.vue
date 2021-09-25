
<template>
  <div>
    <StartingScreen v-if="visibleScreen === Screen.StartingScreen" @navTo="navigate" />
    <Form :array="questions" v-else-if="visibleScreen === Screen.Form" />
    <ChosenTeamView  v-else-if="visibleScreen === Screen.ChosenTeamView" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StartingScreen from '@/components/StartingScreen.vue'
import ChosenTeamView from '@/components/ChosenTeamView.vue'
import Form from '@/components/Form.vue'
import ApiService from '../composables/ApiService'

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
    const navigate = (name: keyof typeof Screen) => {
      visibleScreen.value = Screen[name]
    }
    const questions = ref();

    ApiService.getQuestions().then((res) => {
      questions.value = res.data;
    })
    
    return {
      visibleScreen,
      Screen,
      navigate,
      questions
    }
  }
})
</script>

<style lang="scss">

</style>

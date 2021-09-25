
<template>
  <div>
    <StartingScreen v-if="visibleScreen === Screen.StartingScreen" @navTo="navigate" />
    <Form :array="questions" v-else-if="visibleScreen === Screen.Form" />
    <ChosenTeamView  v-else-if="visibleScreen === Screen.ChosenTeamView" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
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
    ChosenTeamView
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
    
    const localStorageTeam: string | null = localStorage.getItem('registerTeam')
    const drawedTeam: Ref<{id: number, name: string} | null> = ref(null)

    if (localStorageTeam) {
      drawedTeam.value = JSON.parse(localStorageTeam)
    }

    if (drawedTeam.value) {
      navigate('ChosenTeamView')
    }

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

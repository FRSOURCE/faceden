<template>
  <div>
    <StartingScreen v-if="visibleScreen === Screen.StartingScreen" @navTo="navigate" />
    <ChosenTeamView  v-else-if="visibleScreen === Screen.ChosenTeamView" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import StartingScreen from '@/components/StartingScreen.vue'
import ChosenTeamView from '@/components/ChosenTeamView.vue'

enum Screen {
  StartingScreen,
  ChosenTeamView
}

export default defineComponent({
  name: 'Main',
  components: {
    StartingScreen,
    ChosenTeamView
  },
  setup () {
    const visibleScreen = ref(Screen.StartingScreen)
    const localStorageTeam: string | null = localStorage.getItem('registerTeam')
    const drawedTeam: Ref<{id: number, name: string} | null> = ref(null)

    const navigate = (name: keyof typeof Screen) => {
      visibleScreen.value = Screen[name]
    }

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
    }
  }
})
</script>

<style lang="scss">

</style>

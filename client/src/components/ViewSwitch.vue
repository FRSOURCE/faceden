<script lang="ts">
import { defineComponent, ref } from 'vue'
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

    const navigate = (name: keyof typeof Screen) => {
      visibleScreen.value = Screen[name]
    }
    return {
      visibleScreen,
      Screen,
      navigate,
    }
  }
})
</script>

<template>
  <div>
    <StartingScreen v-if="visibleScreen === Screen.StartingScreen" @navTo="navigate" />
    <ChosenTeamView  v-else-if="visibleScreen === Screen.ChosenTeamView" />
  </div>
</template>


<style lang="scss">

</style>

<template>
  <div :class="$style.container">
    <h2 :class="$style.h2">Gratulacje! Zostałeś przydzielony do <span :class="$style['c-green']">"{{ drawedTeam.name }}"</span>!</h2>
    <div :class="$style['image-box']"> 
      <component :is="svgName" :class="$style.image" />
    </div>
    <button type="button" :class="$style['button-run-form']" @click="navigateTo('LookingForGameView')">Rozpocznij rozgrywkę!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import Unicorn from '@/assets/images/1.svg?component'
import Ghost from '@/assets/images/2.svg?component'
import Dragon from '@/assets/images/3.svg?component'
import Narhval from '@/assets/images/4.svg?component'
import Mushroom from '@/assets/images/5.svg?component'
import Octopus from '@/assets/images/6.svg?component'
import Pigeon from '@/assets/images/7.svg?component'
import Turtle from '@/assets/images/8.svg?component'

export default defineComponent({
  name: 'ChosenTeamView',
  components: {
    Unicorn,
    Ghost,
    Dragon,
    Narhval,
    Mushroom,
    Octopus,
    Pigeon,
    Turtle
  },
  emits: ['navTo'],
  setup(_props, { emit }) {
    const localStorageTeam: string | null = localStorage.getItem('registerTeam')
    const drawedTeam: Ref<{id?: number, name?: string}> = ref({})
    const images = ['Unicorn', 'Ghost', 'Dragon', 'Narhval', 'Mushroom', 'Octopus', 'Pigeon', 'Turtle']

    if (localStorageTeam) {
      drawedTeam.value = JSON.parse(localStorageTeam)
    }

    const svgName = ref('Unicorn')
    if (drawedTeam.value?.id !== void 0) {
      svgName.value = images[drawedTeam.value.id - 1]
    }

    return {
      svgName,
      drawedTeam,
      navigateTo: (name: string) => emit('navTo', name)
    }
  }
})
</script>

<style module lang="scss">
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 5vw;
  }

  .h2 {
    font-size: 25px;
    margin: 60px 15px;
    text-align: center;
    color: #fff;
  }

  .image {
    width: 40vw;
    height: 40vw;
    padding: 50px;
  }

  .image-box {
    border: thin solid #0eff6e;
    border-radius: 50%;
  }

  .c-green {
    color: #0eff6e;
  }

  .button-run-form {
    padding: 15px;
    margin: 30px 15px;
    font-size: 24px;
    border: thin solid #000;
    cursor: pointer;
    color: #fff;
    background-color: #000;

    &:hover {
      color: #000;
      background-color: #0eff6e;
    }
  }
</style>

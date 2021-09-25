<template>
  <div :class="$style.container">
    <h2 :class="$style.h2">Gratulacje! Zostałeś przydzielony do <span :class="$style['c-green']">"{{ drawedTeam.name }}"</span>!</h2>
    <div :class="$style['image-box']"> 
      <component :is="svgName" :class="$style.image" />
    </div>
    <h2 :class="$style.h2">Zapamiętaj swoją drużynę!</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import Unicorn from '@/assets/images/1.svg'
import Ghost from '@/assets/images/2.svg'
import Dragon from '@/assets/images/3.svg'
import Narhval from '@/assets/images/4.svg'
import Mushroom from '@/assets/images/5.svg'
import Octopus from '@/assets/images/6.svg'
import Pigeon from '@/assets/images/7.svg'
import Turtle from '@/assets/images/8.svg'

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
  setup() {
    const localStorageTeam: string | null = localStorage.getItem('registerTeam')
    const drawedTeam: Ref<{id: number, name: string} | null> = ref(null)
    const images = ['Unicorn', 'Ghost', 'Dragon', 'Narhval', 'Mushroom', 'Octopus', 'Pigeon', 'Turtle']

    if (localStorageTeam) {
      drawedTeam.value = JSON.parse(localStorageTeam)
    }

    const svgName = ref('Unicorn')
    if (drawedTeam.value) {
      svgName.value = images[drawedTeam.value.id - 1]
    }

    return {
      svgName,
      drawedTeam
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
    margin: 60px;
    text-align: center;
    color: #fff;
  }

  .image {
    width: 50vw;
    padding: 50px;
  }

  .image-box {
    border: thin solid #0eff6e;
    border-radius: 50%;
  }

  .c-green {
    color: #0eff6e;
  }
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import One from '@/assets/images/1.svg'
import Two from '@/assets/images/2.svg?inline'
import Three from '@/assets/images/3.svg?inline'
import Four from '@/assets/images/4.svg?inline'
import Five from '@/assets/images/5.svg?inline'
import Six from '@/assets/images/6.svg?inline'
import Seven from '@/assets/images/7.svg?inline'
import Eight from '@/assets/images/8.svg?inline'

export default defineComponent({
  name: 'ChosenTeamView',
  components: {
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight
  },
  setup() {
    return {
      svgName: ref('One')
    }
  }
})
</script>

<template>
  <div :class="$style.container">
    <h2 :class="$style.h2">Gratulacje! Zostałeś przydzielony do <span :class="$style['c-green']">...</span>!</h2>
    <div :class="$style['image-box']"> 
      <component :is="svgName" :class="$style.image" />
    </div>
    <h2 :class="$style.h2">Zapamiętaj swoją drużynę!</h2>
  </div>
</template>

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

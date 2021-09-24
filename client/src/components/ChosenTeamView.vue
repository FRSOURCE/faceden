<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChosenTeamView'
})
</script>

<template>
  <div :class="$style.container">
    <h2 :class="$style.h2">Gratulacje zostałeś przydzielony do ...!</h2>
    <div :class="$style['image-box']"> 
      <img src="@/assets/images/009-turtle.svg" alt="Logo" :class="$style.image">
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
</style>

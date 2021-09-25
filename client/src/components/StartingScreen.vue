<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StartingScreen',
  emits: ['navTo'],
  setup (_props, { emit }) {
    return {
      navigateTo: (name: string) => emit('navTo', name)
    }
  }
})
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.h1">Faceden</h1>
    <p :class="$style.text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt elit at turpis lacinia, ac sodales magna rutrum. Fusce mollis maximus nisl vitae pharetra. Nulla nec tincidunt nisi. Sed et orci diam. Aenean efficitur justo neque, commodo convallis magna auctor sit amet. Nunc molestie consequat nisl, ut tristique purus iaculis et. Aliquam ornare justo a lectus porta, nec ultrices neque pellentesque. Phasellus vel erat egestas, egestas augue vitae, aliquam erat.</p>
    <button type="button" :class="$style['button-run-form']" @click="navigateTo('ChosenTeamView')">Zaczynamy!</button>
  </div>
</template>

<style module lang="scss">
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 5vw;
  }

  .h1 {
    font-size: 60px;
    margin: 60px;
    font-family: 'Libre Caslon Text', serif;
  }

  .text {
    padding: 15px 30px;
    line-height: 1.5rem;
    text-align: center;
    color: #fff;
  }

  .button-run-form {
    padding: 30px;
    font-size: 32px;
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

<template>
  <div :class="$style.container">
    <h1 :class="$style.h1">Faceden</h1>
    <p :class="$style.text">Weź udział we wspólnym tkaniu edenowej grzybni! Odpowiedz na kilka prostych pytań, które pozwolą nam ją uformować. W swojej cyfrowej postaci, grzybnia stanie się pamiątką z naszego wyjazdu.</p>
    <button type="button" :class="$style['button-run-form']" @click="navigateTo('ChosenTeamView')">Zaczynamy!</button>
  </div>
</template>

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
    padding: 15px;
    margin: 15px;
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

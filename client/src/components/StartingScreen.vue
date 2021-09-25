<template>
  <div :class="$style.container">
    <h1 :class="$style.h1">faceden</h1>
    <p :class="$style.text">
      Weź udział we wspólnym tkaniu edenowej grzybni! Odpowiedz na kilka prostych pytań, które pozwolą nam ją uformować. W swojej cyfrowej postaci, grzybnia stanie się pamiątką z naszego wyjazdu.
    </p>
    <button type="button" @click="navigateTo('Form')">Zaczynamy</button>
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
    margin: 0 5%;
    width: 90%;
  }

  .h1 {
    margin-left: -0.1em;
    font-size: 6rem;
    letter-spacing: -.8rem;
    font-family: 'Libre Caslon Text', serif;
  }

  .text {
    margin-top: 2rem;
    padding: 15px 30px;
    text-align: center;
    color: #fff;
  }
</style>

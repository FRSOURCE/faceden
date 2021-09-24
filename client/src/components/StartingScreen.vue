<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StartingScreen'
})
</script>

<template>
<div :class="$style.main">
  <div :class="$style.container">
    <h1>Faceden</h1>
    <p :class="$style.text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt elit at turpis lacinia, ac sodales magna rutrum. Fusce mollis maximus nisl vitae pharetra. Nulla nec tincidunt nisi. Sed et orci diam. Aenean efficitur justo neque, commodo convallis magna auctor sit amet. Nunc molestie consequat nisl, ut tristique purus iaculis et. Aliquam ornare justo a lectus porta, nec ultrices neque pellentesque. Phasellus vel erat egestas, egestas augue vitae, aliquam erat.</p>
  </div>
</div>
</template>

<style module lang="scss">
  .main {
    background-color: #000;
  }

  .container {
    margin: 0 5vw;
  }

  .h1 {
    font-size: 24px;
  }

  .text {
    color: #fff;
  }

  .button-run-form {

  }
</style>

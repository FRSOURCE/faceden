<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'Form',
  props: {
    array: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { array } = toRefs(props);
    const len = array.value.length;
    const question = ref(0);
    const answers = ref(Array(len + 1).fill(""));
    const showAns = () => {console.log(answers)}
    return {
      question,
      len,
      answers,
      showAns
    }
  }
})
</script>

<template>
  <form :class="$style.form">
    <div v-show="question === 0">
      <label for="name">Name</label>
      <input v-model="answers[0]" type="text" id="name">
    </div>
    <div v-for="(item, index) in array" :key="index" v-show="question === index + 1">
      <label :for="index">{{ item }}</label>
      <input v-model="answers[index+1]" type="text" :id="index">
    </div>
    <div v-show="question === len + 1">
      <label for="avatar">Wyślij selfie lub narysuj siebie i wyślij zdjęcie rysunku:</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      >
    </div>
    <div >
      <button type="button" @click="question = question - 1" v-show="question !== 0">
        Wroc
      </button>
      <button type="button" @click="question = question + 1" v-show="question !== len + 1">
        Dalej
      </button>
      <button type="button" v-show="question === len + 1" @click="showAns">
        Zakończ
      </button>
    </div>
  </form>
</template>

<style module>
/* .form {
  display: flex;
} */
</style>

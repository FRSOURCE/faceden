<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'Form',
  props: {
    array: {
      type: Array as PropType<{ id: number; question: string}[]>,
      required: true
    }
  },
  setup(props) {
    const { array } = toRefs(props);
    const len = array.value.length;
    const picPath = '/hello/123.jpg'
    const question = ref(0);
    const answers = ref(Array(len).fill(""));
    const user =  reactive({
      name: '',
      description: '',
      picPath: picPath
    })
    const showAns = () => {
      console.log(collect())
      }
    const collect = () => {
      const result:Array<{id: number, answer: string}> = []
      array.value.forEach((i, index) => result.push({id: i.id, answer: answers.value[index]}))
      return {user: {name: user.name, description: user.description, path: user.picPath},  result: result}
    }
    return {
      question,
      len,
      user,
      answers,
      showAns
    }
  }
})
</script>

<template>
  <form :class="$style.form">
    <div v-show="question === 0" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Nazwa</label>
      <input v-model="user.name" type="text" id="name">
    </div>
    <div v-show="question === 1" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Opis</label>
      <input v-model="user.description" type="text" id="name">
    </div>
    <div v-for="(item, index) in array" :key="index" v-show="question === index + 2" :class="$style['form__row']">
      <label :class="$style['form__row--label']" :for="index">{{ item.question }}</label>
      <input v-model="answers[index]" type="text" :id="index">
    </div>
    <div v-show="question === len + 2" :class="$style['form__row']">
      <label :class="$style['form__row--label']" for="avatar">Wyślij selfie lub narysuj siebie i wyślij zdjęcie rysunku:</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      >
    </div>
    <div :class="$style['btns']">
      <button type="button" @click="question = question - 1" v-show="question !== 0">
        Wroc
      </button>
      <button type="button" @click="question = question + 1" v-show="question !== len + 2">
        Dalej
      </button>
      <button type="button" v-show="question === len + 2" @click="showAns">
        Zakończ
      </button>
    </div>
  </form>
</template>

<style module lang="scss">
.form {
  display: flex;
  flex-flow: column;
  padding: 0 10vw;

  &__row {
    display: flex;
    flex-flow: column;
    align-items: center;
    
    &--label {
      text-align: center;
    }
  }
}

.btns {
  display: flex;
  justify-content: center;
}
</style>

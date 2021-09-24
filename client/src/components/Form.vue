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
      <input v-model="user.name" :class="$style['form__row--input']" type="text" id="name">
    </div>
    <div v-show="question === 1" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Opis</label>
      <input v-model="user.description" :class="$style['form__row--input']" type="text" id="name">
    </div>
    <div v-for="(item, index) in array" :key="index" v-show="question === index + 2" :class="$style['form__row']">
      <label :class="$style['form__row--label']" :for="index">{{ item.question }}</label>
      <input v-model="answers[index]" type="text" :class="$style['form__row--input']" :id="index">
    </div>
    <div v-show="question === len + 2" :class="$style['form__row']">
      <label :class="$style['form--upload']" for="avatar">Wyślij obraz</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        :class="$style['d-n']"
      >
    </div>
    <div :class="$style['btns']">
      <button type="button" @click="question = question - 1" v-show="question !== 0" :class="[$style['btns--piece']]">
        Wróć
      </button>
      <button type="button" @click="question = question + 1" v-show="question !== len + 2" :class="[$style['btns--piece']]">
        Dalej
      </button>
      <button type="button" v-show="question === len + 2" @click="showAns" :class="[$style['btns--piece'], $style.bold]">
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
  margin-top: 60px;

  &--upload {
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #0eff6e;
    color: #000;
  }

  &__row {
    display: flex;
    flex-flow: column;
    align-items: center;
    
    &--label {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    &--input {
      background-color: transparent;
      border: #0eff6e solid thin;
      font-size: 1.5rem;
      outline: none;
      margin-bottom: 1.5rem;
      width: 100%;
    }
  }
}

.btns {
  display: flex;
  justify-content: center;

  &--piece {
    background-color: transparent;
    padding: 0.75rem;
    margin: 0 1rem;
    border: none;
    color: #0eff6e;

    &:hover {
      background-color: #0eff6e;
      color: black;
    }
  }
}

.bold {
  font-weight: 700;
}

.d-n {
  display: none;
}
</style>

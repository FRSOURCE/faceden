<template>
  <form :class="$style.form" @submit.prevent>
    <div v-if="question === 0" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Nazwa<br><small v-text="'(Imię + atrybut)'"/></label>
      <input v-model="user.name" :class="$style['form__row--input']" type="text" id="name" autocomplete="off" autofocus @keydown.enter="user.name && ++question">
    </div>
    <div v-else-if="question === 1" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Opis</label>
      <input v-model="user.description" :class="$style['form__row--input']" type="text" id="name" autocomplete="off" v-autofocus @keydown.enter="user.description && ++question">
    </div>
    <div v-else-if="question === len + 2" :class="$style['form__row']">
      <label :class="$style['form--upload']" for="avatar">Wyślij obraz</label>
      <input
        ref="fileInput"
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        :class="$style['d-n']"
        @input="pickFile"
      >
    </div>
    <template v-for="(item, index) in array">
    <div v-if="question === index + 2" :class="$style['form__row']" :key="index">
      <label :class="$style['form__row--label']" :for="index.toString()">{{ item.content }}</label>
      <input v-model="answers[index]" type="text" :class="$style['form__row--input']" :id="index.toString()" autocomplete="off" v-autofocus @keydown.enter="answers[index] && ++question">
    </div>
    </template>
    <div :class="$style['btns']">
      <button type="button" v-show="question !== len + 2" :class="[$style['btns--piece']]" :disabled="!isNull" @click="question = question + 1">
        Dalej
      </button>
      <button type="button" v-show="question === len + 2" @click="showAns" :class="[$style['btns--piece'], $style.bold]">
        Zakończ
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, toRefs } from 'vue';
import ApiService from '../composables/ApiService'

export default defineComponent({
  name: 'Form',
  props: {
    array: {
      type: Array as PropType<{ id: number; content: string}[]>,
      required: true
    }
  },
  directives: {
    autofocus: (element) => element.focus(),
  },
  setup(props) {
    const { array } = toRefs(props);
    const len = array.value.length;
    const question = ref(0);
    const answers = ref<string[]>(Array(len).fill(""));
    const user =  reactive({
      name: '',
      description: '',
      picPath: ''
    });
    const showAns = () => {
      console.log(collect())
    };
    const collect = () => {
      const result:Array<{id: number, answer: string}> = []
      array.value.forEach((i, index) => result.push({id: i.id, answer: answers.value[index]}))
      return {user: {name: user.name, description: user.description, path: user.picPath}, answers: result}
    };

    const isNull = computed(() => {
      if(question.value === 0) {
        console.log(user.name.length);
        return user.name.length;
      }
      if(question.value === 1) {
        return user.description.length;
      }
      
      if(question.value === answers.value.length + 2){
        return;
      }

      return answers.value[question.value - 2].length;
    });

    let image = ref();

    const pickFile = (event: Event) => {
      if(!(event.target instanceof HTMLInputElement) || !event.target.files?.length) {
        return;
      }

      image.value = event.target.files[0];
      const formData = new FormData();

      formData.append('photo', image.value)
      ApiService.sendImage(formData).then(res => {
        user.picPath = res.data;
      });
    }

    return {
      question,
      len,
      user,
      answers,
      showAns,
      isNull,
      pickFile
    }
  }
})
</script>

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
      color: #fff;
    }
  }
}

.btns {
  display: flex;
  justify-content: center;
}
</style>

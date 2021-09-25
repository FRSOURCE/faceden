<template>
  <form :class="$style.form" @submit.prevent>
    <div v-if="question === 0" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Twoja nazwa<br><small v-text="'np. imię + atrybut/pseudonim'"/></label>
      <input
        v-model="user.name"
        :class="$style['form__row--input']"
        type="text"
        id="name"
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        autofocus
      >
    </div>
    <div v-else-if="question === 1" :class="$style['form__row']">
      <label for="name" :class="$style['form__row--label']">Opis<br><small>napisz coś o sobie</small></label>
      <textarea
        rows="5"
        maxlength="400"
        v-model="user.description"
        :class="$style['form__row--input']"
        id="name"
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        v-autofocus
      />
      <div :class="$style['textarea-info']">pozostało {{ 400 - user.description.length }} znaków</div>
    </div>
    <div v-else-if="question === len + 2" :class="$style['form__row']">
      <label :class="[$style['form--upload'], $style['pointer']]" for="avatar">Wyślij obraz</label>
      <input
        type="file"
        id="avatar"
        accept="image/png, image/jpeg"
        :class="$style['d-n']"
        capture="user"
        @input="pickFile"
      >
      <img :src="previewImage" :class="$style['imagePreviewWrapper']" />
    </div>
    <template v-for="(item, index) in array">
    <div v-if="question === index + 2" :class="$style['form__row']" :key="index">
      <label :class="$style['form__row--label']" :for="index.toString()">{{ item.content }}</label>

      <textarea
        rows="3"
        maxlength="400"
        v-model="answers[index]"
        :class="$style['form__row--input']"
        :id="index.toString()"
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        v-autofocus
      />
      <div :class="$style['textarea-info']">pozostało {{ 400 - answers[index].length }} znaków</div>
    </div>
    </template>
    <div :class="$style['btns']">
      <button type="button" v-if="question !== len + 2" :disabled="!isNull" @click="question = question + 1">
        Dalej
      </button>
      <button type="button" v-else @click="sendImage" :disabled="!isImg">
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
      type: Array as PropType<{ id: number; question: string}[]>,
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
    const collect = () => {
      const result:Array<{id: number, answer: string}> = []
      array.value.forEach((i, index) => result.push({id: i.id, answer: answers.value[index]}))
      return {user: {name: user.name, description: user.description, path: user.picPath}, answers: result}
    };

    const isNull = computed(() => {
      if(question.value === 0) {
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

    const formData = new FormData();
    let image = ref();
    let previewImage = ref();

    const pickFile = (event: Event) => {
      if(!(event.target instanceof HTMLInputElement) || !event.target.files?.length) {
        return;
      }

      image.value = event.target.files[0];

      formData.append('image', image.value)

      if (image.value) {
        previewImage.value = URL.createObjectURL(image.value);

      }
    }

    const sendImage = () => {
      ApiService.sendImage(formData).then(res => {
        user.picPath = res.data;
      });
    }

    const isImg = computed(() => {
      return image.value
    })

    return {
      question,
      len,
      user,
      answers,
      isNull,
      pickFile,
      sendImage,
      previewImage,
      isImg
    }
  }
})
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-flow: column;
  padding: 0 20px;

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
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      width: 100%;
      color: #fff;
      resize: none;
    }
  }
}

.btns {
  display: flex;
  justify-content: center;
}


.d-n {
  display: none;
}

.textarea-info {
  width: 100%;
  text-align: right;
}

.pointer {
  cursor: pointer;
}

.imagePreviewWrapper {
  background-repeat: no-repeat;
  max-height: 50vh;
  max-width: 90%;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: contain;
  background-position: center center;
}
</style>

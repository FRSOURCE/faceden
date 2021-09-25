<template>
  <div :class="$style.container">
    <h2 :class="$style.h2">Szukanie rozgrywki...</h2>
    <div :class="$style['image-box']"> 
      <component :is="svgName" :class="$style.image" />
    </div>
    <div :class="$style['animation-wrapper']">
      <div ref="slotMachine" :class="[$style['slottt-machine-recipe'], { [$style['animated']]: animationRunning }]">
        <div v-for="el in images" :key="el" :class="$style['image-box-2']"> 
          <component :is="el" :class="$style.image" />
        </div>
        <div v-for="el in images" :key="el" :class="$style['image-box-2']"> 
          <component :is="el" :class="$style.image" />
        </div>
        <div v-for="el in images" :key="el" :class="$style['image-box-2']"> 
          <component :is="el" :class="$style.image" />
        </div>
        <div :class="$style['image-box-2']"> 
          <component :is="images[0]" :class="$style.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, useCssModule } from 'vue'
import Unicorn from '@/assets/images/1.svg?component'
import Ghost from '@/assets/images/2.svg?component'
import Dragon from '@/assets/images/3.svg?component'
import Narhval from '@/assets/images/4.svg?component'
import Mushroom from '@/assets/images/5.svg?component'
import Octopus from '@/assets/images/6.svg?component'
import Pigeon from '@/assets/images/7.svg?component'
import Turtle from '@/assets/images/8.svg?component'

export default defineComponent({
  name: 'ChosenTeamView',
  components: {
    Unicorn,
    Ghost,
    Dragon,
    Narhval,
    Mushroom,
    Octopus,
    Pigeon,
    Turtle
  },
  setup() {
    const animationRunning = ref(false);
    const localStorageTeam: string | null = localStorage.getItem('registerTeam')
    const drawedTeam: Ref<{id?: number, name?: string}> = ref({})
    const images = ['Unicorn', 'Ghost', 'Dragon', 'Narhval', 'Mushroom', 'Octopus', 'Pigeon', 'Turtle']
    const slotMachine = ref<HTMLElement | null>(null)
    const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;

    if (localStorageTeam) {
      drawedTeam.value = JSON.parse(localStorageTeam)
    }

    const svgName = ref('')
    if (drawedTeam.value?.id !== void 0) {
      svgName.value = images[drawedTeam.value.id - 1]
      images.splice(drawedTeam.value.id - 1, 1)
    }
    onMounted(() => {
      if (!slotMachine.value) return;
      const el = slotMachine.value;
      const childSize = (el.children[0] as HTMLElement).offsetWidth;
      const speed = 40;

      const animate = () => {
        animationRunning.value = true;
        const distanceToGo = childSize * (images.length * 2 + Math.round(Math.random() * 8));
        let currentScrollLeft = el.scrollLeft;
        let distance = 0;

        const stepForward = () => {
          const animationProgress = distance/distanceToGo;
          let currentSpeed = distanceToGo - distance < 8
            ? distanceToGo - distance
            : (1 - Math.sin((animationProgress * Math.PI) / 2)) * speed + 5;

          const maxScrollLeft = el.scrollWidth - el.offsetWidth;

          if (distanceToGo - distance < childSize * 1.5) {
            animationRunning.value = false;
          }

          if (el.scrollLeft + currentSpeed >= maxScrollLeft) {
            currentSpeed = maxScrollLeft - el.scrollLeft;
          }

          currentScrollLeft += currentSpeed;
          distance += currentSpeed;
          el.scrollLeft = currentScrollLeft;
          if (currentScrollLeft && currentScrollLeft >= maxScrollLeft) {
            return requestAnimationFrame(() => {
              el.scrollLeft = 0;
              currentScrollLeft = 0;
              requestAnimationFrame(stepForward);
            });
          }
          
          if (distance < distanceToGo) {
            requestAnimationFrame(stepForward);
          } else {
            el.scrollLeft = Math.round(el.scrollLeft / childSize) * childSize;

            setTimeout(animate, 1000);
          }
        };
        
        requestAnimationFrame(stepForward);
      }

      setTimeout(animate, 1000);
    })

    return {
      svgName,
      images,
      slotMachine,
      animationRunning
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

  .h2 {
    font-size: 25px;
    margin: 60px 15px;
    text-align: center;
    color: #fff;
  }

  .image {
    display: block;
    width: 40vw;
    height: 40vw;
    padding: 50px;
  }

  .image-box {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 200px;
    width: 200px;
    margin-bottom: 20px;
    border: thin solid #0eff6e;
    border-radius: 50%;
  }

  .image-box-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 200px;
    width: 200px;
  }

  .animation-wrapper {
    margin: 0 auto 20px;
    border: thin solid #0eff6e;
    width: 200px;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .slottt-machine-recipe {
    display: flex;
    width: 100%;
    overflow: hidden;
  }

  .slottt-machine-recipe {
    transition: 1.5s ease-in-out;
    transition-property: filter, opacity;
  
    &.animated {
      filter: blur(2px);
      opacity: .8;
      transition-duration: .15s;
    }
  }
</style>

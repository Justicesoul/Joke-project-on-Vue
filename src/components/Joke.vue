<template>
  <div class="joke" v-for="(joke, index) in jokes" :key="index">
    <h4 class="joke__question">{{ joke.question }}</h4>
    <h5 class="joke__question" v-if="joke.showAnswer">{{ joke.answer }}</h5>
    <div class="joke__buttons">
      <div>
        <button
          class="joke__delete joke__show-answer"
          @click="$emit('showAnswer', joke.id)"
        >
          <slot name="tell-me"></slot>
        </button>
        <button class="joke__delete" @click="deleteJoke(joke.id)">
          <slot name="delete"></slot>
        </button>
      </div>
      <router-link class="link" :to="`/joke/${joke.id}`">
        <h5><slot></slot>{{ joke.date }}</h5>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Jokes } from '@/views/Home.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Joke',
  props: {
    jokes: {
      type: Array as PropType<Jokes[]>,
      default: () => [
        {
          question: 'Why Sandris is so strict?',
          answer: "So you'll want to visit your mommy more often",
          showAnswer: false,
          date: 'Date: 13.04.1818, Time: 17:49:16',
          id: Math.random(),
        },
      ],
      required: true,
      validator: (value: Jokes[]) => {
        return value.some(({ question }) => {
          return question === 'Why Sandris is so strict?';
        });
      },
    },
    deleteJoke: Function,
  },
  data: () => ({
    hasError: false,
  }),
  created() {
    const isJoke = this.jokes.some(({ question }) => {
      return question === 'Why Sandris is so strict?';
    });
    if (!isJoke) {
      this.hasError = true;
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link {
  text-decoration: none;
  color: black;
}
</style>

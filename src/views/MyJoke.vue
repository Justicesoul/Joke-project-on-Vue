<template>
  <div class="home">
    <h1>Joke:</h1>
    <div class="random-jokes__list">
      <div class="joke random-joke">
        <h3>Question: {{ joke.question }}</h3>
        <h4>Answer: {{ joke.answer }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Jokes } from './Home.vue';

export default defineComponent({
  name: 'MyJoke',
  data: () => ({
    joke: {} as Jokes,
  }),
  created() {
    const routerId = +this.$route.params.id;
    const jokes = JSON.parse(localStorage.getItem('jokes') || '[]');
    const matchedJoke = jokes.find((joke: { id: number }) => {
      return joke.id === routerId;
    });
    this.joke = matchedJoke;
    console.log(this.joke);
  },
});
</script>

<style scoped lang="scss">
.random-jokes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.random-jokes__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  text-decoration: underline;
  text-align: start;
  color: white;
}
</style>

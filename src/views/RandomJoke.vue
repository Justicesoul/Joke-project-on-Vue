<template>
  <div class="home">
    <h1>Joke:</h1>
    <h2 v-if="loading">Loading data...</h2>
    <div v-else class="random-jokes__list">
      <div class="joke random-joke">
        <h3>Caterory: {{ joke.category }}</h3>
        <h4>{{ joke.joke }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

type Joke = {
  category: string;
  type: string;
  joke: string;
  id: number;
  lang: string;
  safe: boolean;
};

export default defineComponent({
  name: 'RandomJoke',
  data: () => ({
    loading: true,
    joke: {} as Joke,
  }),
  created() {
    const routerId = this.$route.params.id as string;
    axios
      .get(`https://v2.jokeapi.dev/joke/Any?type=single&idRange=${routerId}`)
      .then(({ data }) => {
        this.joke = data;
        this.loading = false;
      });
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
}

h1,
h2 {
  text-align: start;
  color: white;
}
</style>

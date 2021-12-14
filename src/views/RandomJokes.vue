<template>
  <input
    class="search"
    type="text"
    placeholder="Search"
    v-model="inputSearch"
  />
  <div class="random-jokes home">
    <h1>Random jokes</h1>
    <h2 v-if="loading">Loading data...</h2>
    <div v-else class="random-jokes__list">
      <div
        class="joke random-joke"
        v-for="(joke, index) in filteredList"
        :key="index"
      >
        <router-link class="link" :to="`/random-jokes/${joke.id}`">
          <h3>{{ index + 1 }}. Caterory: {{ joke.category }}</h3>
          <h4>{{ joke.joke }}</h4>
        </router-link>
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
  name: 'RandomJokes',
  data: () => ({
    loading: true,
    jokes: [] as Joke[],
    inputSearch: '',
  }),
  created() {
    axios
      .get('https://v2.jokeapi.dev/joke/Programming?type=single&amount=10')
      .then(({ data }) => {
        this.jokes = data.jokes;
        this.loading = false;
      });
  },
  computed: {
    filteredList() {
      return this.jokes.filter((joke) => {
        return joke.joke.toLowerCase().includes(this.inputSearch.toLowerCase());
      });
    },
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

.random-joke {
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.85;
  }
}

h1 {
  text-decoration: underline;
  color: white;
}

h2,
h3,
h4 {
  text-align: start;
}

.link {
  text-decoration: none;
  color: black;
}
</style>

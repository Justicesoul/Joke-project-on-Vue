<template>
  <input
    class="search"
    type="text"
    placeholder="Search"
    v-model="inputSearch"
  />
  <div class="home">
    <h2>Create a joke</h2>
    <div class="create-joke">
      <label
        >Question
        <input
          class="input"
          type="text"
          placeholder="Enter the question"
          v-model="inputValueQuestion"
        />
      </label>
      <label
        >Answer
        <input
          class="input"
          type="text"
          placeholder="Enter the punchlihe"
          v-model="inputValueAnswer"
        />
      </label>
      <button
        @click="addNewJoke"
        :class="[
          inputValueAnswer.length > 0 && inputValueQuestion.length > 0
            ? 'create__button'
            : 'create__button disabled',
        ]"
        :title="[
          inputValueAnswer.length > 0 && inputValueQuestion.length > 0
            ? ''
            : 'Please enter question and answer',
        ]"
      >
        Create
      </button>
    </div>

    <Joke
      :jokes="filteredList"
      :deleteJoke="deleteJoke"
      @showAnswer="showAnswer"
    >
      Date:
      <template v-slot:delete>
        <span>Delete</span>
      </template>
      <template v-slot:tell-me>
        <span>Tell me</span>
      </template>
    </Joke>
  </div>
</template>

<script lang="ts">
export type Jokes = {
  question: string;
  answer: string;
  showAnswer: boolean;
  date: string;
  id: number;
};

const currentdate = new Date();
const datetime =
  currentdate.getDate() +
  '.' +
  (currentdate.getMonth() + 1) +
  '.' +
  currentdate.getFullYear() +
  ', Time: ' +
  currentdate.getHours() +
  ':' +
  (currentdate.getMinutes() < 10
    ? '0' + currentdate.getMinutes()
    : currentdate.getMinutes()) +
  ':' +
  (currentdate.getSeconds() < 10
    ? '0' + currentdate.getSeconds()
    : currentdate.getSeconds());

import { defineComponent } from 'vue';
import Joke from '@/components/Joke.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Joke,
  },
  data: () => ({
    inputValueQuestion: '',
    inputValueAnswer: '',
    inputSearch: '',
    jokes: [
      {
        question: 'Why Sandris is so strict?',
        answer: "So you'll want to visit your mommy more often",
        showAnswer: false,
        date: datetime,
        id: Math.random(),
      },
    ] as Jokes[],
  }),

  // as useState
  methods: {
    addNewJoke() {
      if (
        this.inputValueQuestion.length > 0 &&
        this.inputValueAnswer.length > 0
      ) {
        this.jokes.push({
          question: this.inputValueQuestion,
          answer: this.inputValueAnswer,
          showAnswer: false,
          date: datetime,
          id: Math.random(),
        });
        this.inputValueQuestion = '';
        this.inputValueAnswer = '';
        localStorage.setItem('jokes', JSON.stringify(this.jokes));
      }
    },
    deleteJoke(i: number) {
      const newJokeList = this.jokes.filter((joke) => {
        return joke.id !== i;
      });
      this.jokes = newJokeList;
      localStorage.setItem('jokes', JSON.stringify(this.jokes));
    },
    showAnswer(i: number) {
      const newJokeList = this.jokes.map((joke) => {
        if (i === joke.id) {
          joke.showAnswer = !joke.showAnswer;
        }
        return joke;
      });
      this.jokes = newJokeList;
    },
    problem() {
      console.log("We've got a problem here");
    },
  },

  // as useMemo
  computed: {
    filteredList() {
      return this.jokes.filter((joke) => {
        return joke.question
          .toLowerCase()
          .includes(this.inputSearch.toLowerCase());
      });
    },
  },
  created() {
    this.jokes = JSON.parse(
      localStorage.getItem('jokes') || JSON.stringify(this.jokes)
    );
  },

  // as useEffect
  watch: {
    jokes(joke) {
      if (joke.length === 0) {
        this.problem();
      }
    },
  },
});
</script>

<style lang="scss">
h2 {
  color: white;
}

.home {
  width: 100%;
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 8px;
}

.create-joke {
  display: flex;
  flex-direction: column;
  background-color: #42b983;
  border-radius: 4px;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
}

label {
  color: white;
  text-align: start;
}

.input {
  display: block;
  width: 100%;
  padding: 5px 8px;
  border-radius: 3px;
  outline: none;
  border: none;
  margin: 5px 0 12px;
}

.create__button {
  width: 100px;
  background-color: #2c3e50;
  border: #2c3e50 2px solid;
  border-radius: 4px;
  padding: 5px 10px;
  color: #42b983;
  cursor: pointer;
  &:hover {
    color: #2c3e50;
    background-color: #42b983;
  }
}

.joke {
  width: 100%;
  background-color: rgb(216, 214, 214);
  color: black;
  border-radius: 4px;
  padding: 1px 15px;
  margin-bottom: 10px;
}

.joke__question {
  text-align: start;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.joke__delete {
  width: 80px;
  border: none;
  background-color: rgb(216, 2, 2);
  border-radius: 4px;
  padding: 7px 10px;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}

.joke__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.joke__show-answer {
  color: black;
  margin-right: 10px;
  background-color: rgb(212, 212, 1);
}

.search {
  padding: 5px 8px;
  border-radius: 3px;
  margin: 5px 0 12px;
  border: 1px solid, black;
  border-radius: 2px;
}
</style>

<template>
  <div id="nav">
    <router-link class="logo" to="/"></router-link>
    <router-link class="a" to="/">Jokes</router-link> |
    <router-link class="a" to="/random-jokes">Random jokes</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 20px;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#nav {
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .a {
    font-weight: bold;
    border: 1px solid #2c3e50;
    border-radius: 4px;
    padding: 7px 10px;
    text-decoration: none;
    background-color: #2c3e50;
    color: #42b983;
    margin-right: 10px;
    margin-left: 10px;
    &.router-link-exact-active {
      background-color: #42b983;
      color: #2c3e50;
    }
    &:hover {
      color: white;
    }
  }
}

.logo {
  width: 100px;
  height: 100px;
  background-image: url('./assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
}
</style>

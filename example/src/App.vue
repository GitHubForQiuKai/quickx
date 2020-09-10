<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      State count：{{$store.state.count}} </br>
      Getters doubleCount: {{$store.getters.doubleCount}}

    <div>
      <button @click="$store.commit('increment')">Commit count</button>
      <button @click="$store.dispatch('increment')">Dispatch count</button>
    </div>
    </div>

    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

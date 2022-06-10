<template>
  <nav class="navbar fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Storied</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-labe="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  <div id="app">
    <StoryTiles/>
  </div>
  <div class="container-fluid bg-dark text-light mt-3 text-center"> Storied &#169; 2022 </div>
</template>

<script>
import StoryTiles from './components/StoryTiles.vue'

export default {
  name: 'App',
  components: {
    StoryTiles
  }
}
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

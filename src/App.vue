<template>
    <div>
      <StoryTiles/>
    <div class="container-fluid bg-dark text-light mt-3 text-center fixed-bottom"> Storied &#169; 2022</div>
    </div>
    
</template>

<script>
import StoryTiles from './components/StoryTiles.vue'

export default {
  name: 'App',
  data () {
    return {
      image: "/Users/christopherroos/Programming/pdx_code/class_koi/5_capstone/storied/src/assets/daniel-burka-facU72FcKBI-unsplash.jpg"
    }
  },
  components: {
    StoryTiles,
  },
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
  background-image: url('~@/assets/linus-sandvide.jpg');
  background-size: 100%;
  min-height: 100vh;
};


</style>

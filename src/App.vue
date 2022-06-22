<template>
    <div>
        
      <NavBar
        :story="story" 
        :storyTitles="storyTitles"
        @handle-pick-story="pickStory"
      />

      <router-view/>
      
      <div v-if="this.$store.state.isAuthenticated" id="gameView">
        <GameView
          :story="story"
          :storytiles="storytiles"
        />
      </div>
      
      <div class="container-fluid bg-dark text-light mt-3 text-center fixed-bottom"> Storied &#169; 2022</div>
    </div>
</template>

<script>

import axios from 'axios'
import NavBar from './components/NavBar.vue'
import GameView from './components/GameView.vue'

export default {
  name: 'App',
  
  data() {
    return {
      // StoryTiles
      storytiles: [],
      promptId: 0,
      xCoord: 0,
      yCoord: 0,
      xyCoord: ``,        
      story: '',
      storyPrompt: '',
      promptList: [],
      gamePrompt: '',
      storyTitles: [],
    }
  },
  
  methods: {
    async getData() {
      try {
        // fetch storytiles
        const response = await axios.get('api/story_tiles/')
        this.storytiles = response.data
        console.log(this.storytiles)
        for (let i=0; i<this.storytiles.length; i++) {
            this.storytiles[i].xyCoords = `(${this.storytiles[i].x_coord}, ${this.storytiles[i].y_coord})`
        }
        this.xCoord = this.storytiles[0].x_coord
        this.yCoord = this.storytiles[0].y_coord
        this.story = this.storytiles[0].story
        for (let i=0; i<this.storytiles.length; i++) {
          if (!this.storyTitles.includes(this.storytiles[i].story)){
            this.storyTitles.push(this.storytiles[i].story)
          }
        }
        // this.setGameData()
      } catch (error) {
          // log the error
          console.log(error)
        }
    },
    pickStory(story) {
      this.story = story
      // this.setGameData()
      // this.resetStory()
    },     
  },
  
  components: {
    NavBar,
    GameView,
  },

  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
  
  created() {
    this.getData()
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
  background-position: center;
  min-height: 100vh;
};


</style>

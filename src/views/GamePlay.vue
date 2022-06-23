<template>
    <div v-if="this.$store.state.isAuthenticated" id="gameView">
        <GameView
          :story="story"
          :storytiles="storytiles"
          :promptList="promptList"

        />
    </div>
</template>

<script>
    
import axios from 'axios'

import GameView from '../components/GameView.vue'

export default {
    name: 'GamePlay',
    components: {
        GameView,
    },
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
    },
    created() {
    this.getData()
    }
}

</script>

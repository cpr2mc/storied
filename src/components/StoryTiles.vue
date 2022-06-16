<template>
    <NavBar 
        :story="story" 
        :storyTitles="storyTitles"
        @handle-pick-story="pickStory"
    />

    <div class="row mx-3 mb-3">
        <div class="col text-center">
            <h3>Map</h3>
            <canvas id="grid" width="200" height="200"></canvas>
                <br>
            <button @click='moveForward' class="btn btn-secondary mx-2 mb-2">Forward</button>
                <br>
            <button @click='moveLeft' class="btn btn-secondary mx-2">Left</button>
            <button @click='moveRight' class="btn btn-secondary mx-2">Right</button>
                <br>
            <button @click='moveBackward' class="btn btn-secondary mx-2 mt-2">Backward</button>
        </div>

        <div class="col text-center">
            <h3>Player Stats</h3>
            build a model and render a list here.
        </div>
    </div>
    
    <div class="row mx-3 overflow-auto" style="max-height:300px;">
        <div v-if="storytiles[0]" class="col-md gameplay-container mb-3">
            <div class="storytiles_content">
                <div class="font-monospace bg-dark text-white mb-3">
                    <ul v-for="item in promptList" :key="item.id" class="list-group text-white">
                        <li v-if="item == promptList[0]" class="list-group-item active font-monospace bg-dark text-white">
                            >>>{{ item }}
                        </li>
                        <li v-else class="list-group-item font-monospace bg-secondary text-white">
                            >>>{{ item }}
                        </li>
                    </ul>
                </div>
                
        
            </div>

        </div>
    </div>

</template>

<script>
    import NavBar from './NavBar.vue'

    export default {
        components: {
            NavBar,
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
                    const response = await this.$http.get('http://localhost:8000/api/story_tiles/?format=json');
                    this.storytiles = response.data;
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
                    this.setGameData()
                } catch (error) {
                    // log the error
                    console.log(error)
                }
            },            
            setGameData() {
                this.xyCoord = `(${this.xCoord}, ${this.yCoord})`
                this.gamePrompt = ''
                for (let i=0; i<this.storytiles.length; i++) {
                    if (this.storytiles[i].xyCoords == this.xyCoord && this.storytiles[i].story == this.story) {
                        this.storyPrompt = this.storytiles[i].prompt
                        this.setGamePrompts()
                    }
                }
            },
            setGamePrompts() {
                this.promptList.push(`${this.gamePrompt} ${this.storyPrompt} ${this.xyCoord}`)
                this.promptList.reverse()
                console.log(`PROMPT LIST: ${this.promptList}`)
            },
            pickStory(story) {
                this.story = story
                this.setGameData()
                this.resetStory()
            },
            resetStory() {
                this.xCoord = 0
                this.yCoord = 0
                this.promptList = []
                this.genGrid()
                this.setGamePrompts()
            },
            genGrid() {
                const canvas = document.getElementById('grid');
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.strokeStyle = "#212529";
                ctx.fillStyle = '#6610f2'
                ctx.font = '10px serif'
                ctx.lineWidth = 4;

                // draw grid
                for (let i = 0; i<= 2; i++) {
                    const x = i*100;
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();

                    const y = i*100;
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();
                }
                // fill grid
                const p = ctx.lineWidth / 2; // padding
                for (let xCell = 0; xCell < 2; xCell++) {
                    for (let yCell = 0; yCell < 2; yCell++) {
                        if (this.xCoord == xCell && this.yCoord == yCell) {
                            const x = xCell * 100;
                            const y = yCell * 100;
                            ctx.fillRect(x+p, y+p, 100-p*2, 100-p*2);
                        }
                    }
                }
            },
            moveLeft () {
                if (this.xCoord > 0) {
                    this.xCoord --
                    this.setGameData()
                    this.genGrid()
                }
                else if (this.xCoord == 0) {
                    this.gamePrompt = "There is a massive cliff to your left. You cannot go in that direction."
                    this.setGamePrompts()
                }
            },
            moveRight () {
                if (this.xCoord < 1) {
                    this.xCoord ++
                    this.setGameData()
                    this.genGrid()
                }
                else if (this.xCoord == 1) {
                    this.gamePrompt = "There is a massive cliff to your right. You cannot go in that direction."
                    this.setGamePrompts()
                }
            },
            moveForward () {
                if (this.yCoord < 1) {
                    this.yCoord ++
                    this.setGameData()
                    this.genGrid()
                }
                else if (this.yCoord == 1) {
                    this.gamePrompt = "There is a massive cliff ahead of you. You cannot go in that direction."
                    this.setGamePrompts()
                }
            },
            moveBackward () {
                if (this.yCoord > 0) {
                    this.yCoord --
                    this.setGameData()
                    this.genGrid()
                }
                else if(this.yCoord == 0) {
                    this.gamePrompt = "There is a massive cliff that way. You cannot go in that direction."
                    this.setGamePrompts()
                }
            }
            
        },
        created() {
            // Fetch storytiles on page load
            this.getData()
            this.setGameData()
        },
        mounted() {
            this.genGrid()
        }
    }
</script>

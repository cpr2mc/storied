<template>
    <div v-if="this.$store.state.isAuthenticated" id="gameView">
        <div class="row mx-3 mb-3">
            <div class="col text-center mt-3">
                <h3 class="text-light">Map</h3>
                <canvas id="grid" width="200" height="200"></canvas>
                    <br>
                <button @click='moveForward' class="btn btn-secondary mx-2 mb-2">Forward</button>
                    <br>
                <button @click='moveLeft' class="btn btn-secondary mx-2">Left</button>
                <button @click='moveRight' class="btn btn-secondary mx-2">Right</button>
                    <br>
                <button @click='moveBackward' class="btn btn-secondary mx-2 mt-2">Backward</button>
            </div>

            <div class="col text-center mt-3">
                <h3 class="text-light">Player Stats</h3>
                <p v-if="playerDead" class="text-danger">You died. Feel free to continue exploring though.</p>
                <p v-else class="text-light">You are alive. Continue to explore.</p>
            </div>
        </div>
        
        <div class="row mx-3 overflow-auto" style="max-height:300px;">
            <div class="col-md gameplay-container mb-3"> <!-- v-if="gameStorytiles[0]" -->
                <div class="storytiles_content">
                    <div class="font-monospace bg-dark text-white mb-3">
                        <ul v-for="item in promptList.slice().reverse()" :key="item.id" class="list-group text-white">
                            <li class="list-group-item font-monospace bg-secondary text-white">
                                >>>{{ item }}
                            </li>
                        </ul>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="text-light">You must log in or sign up to play.</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {        
        props: {
            story: {
                type: String,
                required: true,
                default: () => ''
            },
            // storytiles: {
            //     type: Array,
            //     required: true,
            //     default: () => []
            // },
            // promptList: {
            //     type: Array,
            //     required: true,
            //     default: () => []
            // },
        },
        data() {
            return {
                storytiles: [],
                gamePrompt: '',
                gameXyCoord: '',
                xCoord: 0,
                yCoord: 0,
                gameStory: '',
                storyPrompt: '',
                promptList: [], // take this logic and put it in the app.vue, pass the prop down
                maxStoryLength: 7,
                enemyTile: false,
                playerDead: false,
            }
        },
        computed: {
            storyTilesTest () {
                return this.storytiles.filter(tile => tile.story === this.story)
            }
        },
        watch: {
            story() {
                this.resetStory()
            },
            enemyTile() {
                this.playerDead = true
            }
                

        },
        methods: {       
            async getGameData() {
                console.log('getGameData EXECUTED')
                const response = await axios.get('api/story_tiles/')
                this.storytiles = response.data
                for (let i=0; i<this.storytiles.length; i++) {
                    this.storytiles[i].xyCoords = `(${this.storytiles[i].x_coord}, ${this.storytiles[i].y_coord})`
                }
                this.setGameData()
            },     
            setGameData() {
                console.log('setGameData EXECUTED')
                
                this.xCoord = this.storytiles[0].x_coord
                console.log('beginning this.xCoord: ', this.xCoord)
                this.yCoord = this.storytiles[0].y_coord
                console.log('beginning this.yCoord: ', this.yCoord)
                this.gameStory = this.story
                console.log(this.gameStory)
                this.gamePrompt = ''
                this.setCoords()
                this.setGamePrompts()
            },
            setCoords() {
                console.log('setCoords EXECUTED')
                this.xyCoord = `(${this.xCoord}, ${this.yCoord})`
                for (let i=0; i<this.storytiles.length; i++) {
                    if (this.storytiles[i].xyCoords == this.xyCoord && this.storytiles[i].story == this.story) {
                        this.storyPrompt = this.storytiles[i].prompt
                        if (this.storytiles[i].enemy_tile === true) {
                            this.enemyTile = true
                        }
                    }
                }
            },
            setGamePrompts() {
                this.promptList.push(`${this.gamePrompt} ${this.storyPrompt} ${this.xyCoord}`)
                console.log(`PROMPT LIST: ${this.promptList}`)
            },
            genGrid() {
                console.log('genGrid EXECUTED')
                const canvas = document.getElementById('grid');
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.strokeStyle = "#212529";
                ctx.fillStyle = '#6610f2'
                ctx.font = '10px serif'
                ctx.lineWidth = 2;

                // draw grid
                for (let i = 0; i<= (this.maxStoryLength+1); i++) {
                    const x = i*25;
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();

                    const y = i*25;
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();
                }
                // fill grid
                const p = ctx.lineWidth / 2; // padding
                for (let xCell = 0; xCell < (this.maxStoryLength+1); xCell++) {
                    for (let yCell = 0; yCell < (this.maxStoryLength+1); yCell++) {
                        if (this.xCoord == xCell && this.yCoord == yCell) {
                            const x = xCell * 25;
                            const y = yCell * 25;
                            ctx.fillRect(x+p, y+p, 25-p*2, 25-p*2);
                        }
                    }
                }
            },
            resetStory() {
                console.log('resetStory EXECUTED')
                this.xCoord = 0
                this.yCoord = 0
                this.promptList = []
                this.gamePrompt = ''
                this.setCoords()
                this.genGrid()
                this.setGamePrompts()
            },
            moveLeft () {
                if (this.xCoord > 0) {
                    this.xCoord --
                    this.setCoords()
                    this.gamePrompt = ''
                    this.setGamePrompts()
                    this.genGrid()
                }
                else if (this.xCoord == 0) {
                    this.gamePrompt = "There is a massive cliff to your left. You cannot go in that direction."
                    this.setGamePrompts()
                }
                console.log('moveLeft EXECUTED', this.xCoord, this.yCoord)
            },
            moveRight () {
                if (this.xCoord < (this.maxStoryLength)) {
                    this.xCoord ++
                    this.setCoords()
                    this.gamePrompt = ''
                    this.setGamePrompts()
                    this.genGrid()
                }
                else if (this.xCoord == (this.maxStoryLength)) {
                    this.gamePrompt = "There is a massive cliff to your right. You cannot go in that direction."
                    this.setGamePrompts()
                }
                console.log('moveRight EXECUTED', this.xCoord, this.yCoord)
            },
            moveForward () {
                if (this.yCoord < (this.maxStoryLength)) {
                    this.yCoord ++
                    this.setCoords()
                    this.gamePrompt = ''
                    this.setGamePrompts()
                    this.genGrid()
                }
                else if (this.yCoord == (this.maxStoryLength)) {
                    this.gamePrompt = "There is a massive cliff ahead of you. You cannot go in that direction."
                    this.setGamePrompts()
                }
                console.log('moveForward EXECUTED', this.xCoord, this.yCoord)
            },
            moveBackward () {
                if (this.yCoord > 0) {
                    this.yCoord --
                    this.setCoords()
                    this.gamePrompt = ''
                    this.setGamePrompts()
                    this.genGrid()
                }
                else if(this.yCoord == 0) {
                    this.gamePrompt = "There is a massive cliff that way. You cannot go in that direction."
                    this.setGamePrompts()
                }
                console.log('moveBackward EXECUTED', this.xCoord, this.yCoord)
            }
        },
        mounted() {
            this.genGrid()
            // this.setGameData()
        },
        beforeMount() {
            this.getGameData()
            
            // this.genGrid()
        }
    }
</script>

<template>
    <div v-if="storytiles[0]" class="gameplay-container">
        <div class="storytiles_content">
            <h1>{{ storytiles[prompt_id].story }} Gameplay</h1>
            
            <p>{{ storytiles[prompt_id].prompt }} ({{storytiles[prompt_id].x_coord}}, {{storytiles[prompt_id].y_coord}})</p>
            
            <button @click='prompt_id++' class="btn btn-secondary mx-2 mb-2">Next Prompt (MVP)</button>
            <br>
            <button class="btn btn-secondary mx-2">Left</button>
            <button class="btn btn-secondary mx-2">Right</button>
            <br>
            <button @click='prompt_id--' class="btn btn-secondary mx-2 mt-2">Backwards (MVP)</button>
    
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // StoryTiles
                storytiles: [],
                prompt_id: 0,
                x_coord: 0,
                y_coord: 0,
                story: '',
                prompt: '',

            }
        },
        methods: {
            async getData() {
                try {
                    // fetch storytiles
                    const response = await this.$http.get('http://localhost:8000/api/story_tiles/?format=json');
                    // console.log(response.data)
                    // set the data returned as storytiles
                    this.storytiles = response.data;
                    console.log(this.storytiles)
                    this.x_coord = parseInt(this.storytiles[0].x_coord)
                    this.y_coord = parseInt(this.storytiles[0].y_coord)
                } catch (error) {
                    // log the error
                    console.log(error)
                }
            },
            
        },
        created() {
            // Fetch storytiles on page load
            this.getData()

        }
    }
</script>
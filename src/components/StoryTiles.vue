<template>
    <div class="gameplay-container">
        <div class="storytiles_content">
            <h1>Gameplay</h1>
            
            <p>{{ storytiles }}</p>

            <button class="btn btn-primary">Next</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // StoryTiles
                storytiles: []
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
                } catch (error) {
                    // log the error
                    console.log(error)
                }
            },
        },
        created() {
            // Fetch storytiles on page load
            this.getData();
        }
    }
</script>
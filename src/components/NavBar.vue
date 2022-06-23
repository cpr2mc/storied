<template>
    <nav class="navbar navbar-dark bg-dark fixed-top text-light">
        <div class="container-fluid">
        <router-link class="navbar-brand text-secondary" to="/">Storied</router-link>
        <span v-if="this.$store.state.isAuthenticated && isGamePlay" class="text-center fs-4">{{ story }}</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Storied: Menu</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">About</router-link>
                </li>
                <div v-if="this.$store.state.isAuthenticated">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Stories
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="offcanvasNavbarDropdown">
                            <li v-for="story in storyTitles" :key="story">
                                <router-link 
                                    class="dropdown-item" 
                                    @click='pickStory(story)' 
                                    :to="{ 
                                        name: 'GameView',
                                        params: {story: story},
                                    }">
                                {{ story }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </div>
                <li class="nav-item">
                    <router-link to="/log-in" class="nav-link">Log-in</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/sign-up" class="nav-link">Sign-up</router-link>
                </li>
                
            </ul>
            </div>
        </div>
        </div>
    </nav>

</template>

<script>
    export default {
        name: 'NavBar',
        props: {
            story: {
                type: String,
                required: true,
            },
            storyTitles: {
                type: Array,
                required: true,
                default: () => []
            },
            storytiles: {
                type: Array,
                required: true,
                default: () => []
            },
            promptList: {
                type: Array,
                required: true,
                default: () => []
            },
        },
        methods: {
            pickStory(story) {
                this.$emit('handle-pick-story', story)
            }
        },
        computed: {
            isGamePlay() {
                return this.$route.name === 'GameView'
            }
        }
    }
</script>

<template>
    <nav class="navbar navbar-dark bg-dark fixed-top text-light">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Storied</a>
        <span class="text-center fs-4">{{ story }}</span>
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
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Log-in</a>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stories
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="offcanvasNavbarDropdown">
                    <li v-for="story in storyTitles" :key="story"><a class="dropdown-item" @click='pickStory(story)'>{{ story }}</a></li>
                </ul>
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
            }
        },
        methods: {
            pickStory(story) {
                this.$emit('handle-pick-story', story)
            }
        }
    }
</script>

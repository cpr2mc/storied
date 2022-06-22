<template>
    <div class="home">
    <div v-if="this.$store.state.isAuthenticated" class="text-light">
        <!-- <GameView/> -->
    </div>
    <div v-else class="d-grid gap-1 col-6 mx-auto text-light">
        <br>
        <router-link to="/log-in"><button type="button" class="btn btn-secondary m-1">Log In</button></router-link>
        
        <router-link to="/sign-up"><button type="button" class="btn btn-primary m-1">Sign Up!</button></router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'StoriedHome',
    }
</script>

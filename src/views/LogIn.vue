<template>
    <div class="log-in">
        <h3 class="text-light">Log In</h3>
    </div>
    <form @submit.prevent="submitForm">
        <div class="mb-1 mx-auto text-light" style="width:200px;">
            <label for="LogInEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="LogInEmail" name="username" v-model="username">
        </div>
        <div class="mb-3 mx-auto text-light" style="width:200px;">
            <label for="LogInPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="LogInPassword" name="password" v-model="password">
        </div>
        <button type="submit" class="btn btn-secondary">Log-in</button>
    </form>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'LogIn',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            submitForm() {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post('/api/v1/token/login', formData)
                    .then(response => {
                        const token = response.data.auth_token

                        this.$store.commit('setToken', token)

                        axios.defaults.headers.common['Authorization'] = 'Token ' + token

                        localStorage.setItem('token', token)
                        this.$router.push('/')

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

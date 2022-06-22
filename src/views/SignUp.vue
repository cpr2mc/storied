<template>
    <div class="sign-up">
        <h3 class="text-light">Sign Up</h3>
        <form @submit.prevent="submitForm">
            <div class="mb-1 mx-auto text-light" style="width:200px;">
                <label for="SignUpEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="SignUpEmail" name="username" v-model="username">
            </div>
            <div class="mb-3 mx-auto text-light" style="width:200px;">
                <label for="SignUpPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="SignUpPassword" name="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-secondary">Sign-up</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'SignUp',
        data() {
            return {
                username: '',
                password: '',
                email: ''
            }
        },
        methods: {
            submitForm() {
                const formData = {
                    username: this.username,
                    password: this.password,
                    email: this.username
                }
                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                        this.$router.push('/log-in')
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

</script>

<template>
    <div v-if="!this.$store.state.isAuthenticated">
        <div class="sign-up">
            <h3 class="text-light">Sign Up</h3>
            <div v-if="signUpError" class="text-danger">{{ signUpError }}</div>
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
    </div>
    <div v-else class="text-light">You are already logged in.</div>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'SignUp',
        data() {
            return {
                username: '',
                password: '',
                email: '',
                signUpError: ''
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
                        this.signUpError = 'Sign up failed. Please check that your username is in email format and that your password contains at least one special character and one number.'
                    })
            }
        }
    }

</script>

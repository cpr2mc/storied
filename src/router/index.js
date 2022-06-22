import { createRouter, createWebHistory } from 'vue-router'

import StoriedHome from '../views/StoriedHome.vue'
import StoriedAbout from '../views/StoriedAbout.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'

const routes = [
    {
        path: '/',
        name: 'StoriedHome',
        component: StoriedHome
    },
    {
        path: '/about',
        name: 'StoriedAbout',
        component: StoriedAbout
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/log-in',
        name: 'LogIn',
        component: LogIn
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
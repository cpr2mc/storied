import { createRouter, createWebHistory } from 'vue-router'

import StoriedHome from '../views/StoriedHome.vue'
import StoriedAbout from '../views/StoriedAbout.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
// import GamePlay from '../views/GamePlay.vue'
import GameView from '../components/GameView.vue'

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
    {
        path: '/play/:story',
        name: 'GameView',
        component: GameView,
        // name: 'GamePlay',
        // component: GamePlay,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


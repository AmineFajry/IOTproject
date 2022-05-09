import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login/Login'
import Badge from "@/components/Badge/Badge";
import ObjetConnecte from '@/components/ObjetConnecte/ObjetConnecte'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Badges',
        name: 'Badge',
        component: Badge
    },
    {
        path:'/iot',
        name:'ObjetConnecte',
        component:ObjetConnecte
    }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
    if (localStorage.getItem("token") === null && to.name !== 'Login') {
        next({path: '/login', props: { errorMessage: 'Veuillez vous connecter avant d\'accéder à cette page' } });
    }
    next();
})
  

export default router

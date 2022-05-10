import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login/Login'
import Badge from "@/components/Badge/Badge";
import ObjetConnecte from '@/components/ObjetConnecte/ObjetConnecte'
import Historique from "@/components/Historique/Historique";

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
    },
    {
        path:'/historique',
        name:'historique',
        component:Historique
    }
]

const router = new VueRouter({
  routes
})


export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:() => import('../views/home/Home.vue')
    },
    {
        path:'/cart',
        component:() => import('../views/cart/cart.vue')
    },
    {
        path:'/category',
        component:() => import('../views/category/category.vue')
    },
    {
        path:'/profile',
        component:() => import('../views/profile/profile.vue')
    },
    {
        path:'/Details',
        component:() => import('../views/datails/Details.vue')
    } 
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router
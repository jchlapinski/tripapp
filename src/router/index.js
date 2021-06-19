import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Places from "@/views/Places";
import Home from "@/views/Home";
import Place from "@/views/Place";
import CommentList from "@/views/CommentList";
import PlaceContainer from "@/views/PlaceContainer";
import NotFound from "@/views/NotFound";

const routes = [
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/register',
        name: "Register",
        component: Register
    },
    {
        path: '/auth/facebook',
        redirect: '/auth/facebook',
    },
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/places',
        name: "Places",
        component: Places
    },
    {
        path: '/places/:placeId',
        name: "Place",
        component: PlaceContainer,
        children: [
            {
                path: '',
                name: "PlaceData",
                props: true,
                component: Place
            },
            {
                path: 'comments',
                name: "Comments",
                component: CommentList
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const { store } = await import('@/store')
    if (["Login", "Register"].indexOf(to.name) === -1 && !store.getters.isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

import {createRouter, createWebHistory} from "vue-router";
import Places from "@/views/Places";
import Home from "@/views/Home";
import Place from "@/views/Place";
import CommentList from "@/views/CommentList";
import PlaceContainer from "@/views/PlaceContainer";
import NotFound from "@/views/NotFound";

const routes = [
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
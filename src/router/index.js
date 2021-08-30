import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '../views/event/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

const routes = [
    {
        path: '/',
        name: 'EventList',
        props: (route) => ({ page: parseInt(route.query.page) || 1 }),
        // props: { showExtra: true }, // Props Object Mode used to configure component from router
        // props: (route) => ({ showExtra: route.query.e }) // Object Function Mode -- for https://page/?e = true
        component: EventList,
    },
    {
        path: '/events/:id', // to access "id" inside of a component
        name: 'EventLayout',
        props: true,
        component: EventLayout,
        children: [
        {
            path: '', // having this path empty means that component will be loaded at root path
            name: 'EventDetails',
            component: EventDetails,
        },
        {
            path: 'register',
            name: 'EventRegister',
            component: EventRegister,
        },
        {
            path: 'edit',
            name: 'EventEdit',
            component: EventEdit,
        }],
    },
    // ONE WAY TO REDIRECT
    //   {
    //     path: '/event/:id',
    //     redirect: () => {
    //         return { name: 'EventDetails'}
    //     },
    //     children: [
    //         {
    //             path: 'register',
    //             redirect: () => {
    //                 return { name: 'EventRegister'}
    //             }
    //         },
    //         {
    //             path: 'edit',
    //             redirect: () => {
    //                 return { name: 'EventEdit'}
    //             }
    //         }
    //     ]
    //   },

    // ANOTHER WAY
    {
        path: '/event/:afterEvent(.*)',
        redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
        },
    },
    {
        path: '/about-us',
        name: 'About',
        component: About,
        alias: '/about', // not good for SEO, can be penilized by Google for repeating content
    },
    {
    path: '/about', // redirect
    redirect: { name: 'About' },
    },
    {
        path: '/:catchAll(.*)', // What to do when PATH does not exist
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/404/:resource', // What to do when RESOURCE does not exist
        name: '404Resource',
        component: NotFound,
        props: true
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetworkError
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

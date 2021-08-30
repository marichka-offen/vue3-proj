import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    props: route => ({ page: parseInt(route.query.page) || 1}),
 // props: { showExtra: true }, // Props Object Mode used to configure component from router
 // props: (route) => ({ showExtra: route.query.e }) // Object Function Mode -- for https://page/?e = true
    component: EventList
  },
  {
    path: '/event/:id', // to access "id" inside of a component
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
        {
            path: '', // having this path empty means that component will be loaded at root path
            name: 'EventDetails',
            component: EventDetails
        },
        {
            path: 'register', 
            name: 'EventRegister',
            component: EventRegister 
        },
        {
            path: 'edit', 
            name: 'EventEdit',
            component: EventEdit
        }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
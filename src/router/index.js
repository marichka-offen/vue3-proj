import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
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
    name: 'EventDetails',
    props: true,
    component: EventDetails
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
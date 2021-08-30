<template>
  <!-- <h2>Event# {{ id }}</h2> -->
  <!-- OR -->
  <!-- <h2>Event# {{ $route.params.id }}</h2> -->
  <!-- NOT recommended because it makes component highly coupled to the route -->

  <!-- TO ACCESS QUERY: -->
  <!-- <h3>You are on page {{ $route.query.page }}</h3> -->

  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  props: ['id'],
  data() {
    return {
      event: null,
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          // if the event does not exist, load 404
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' },
          })
        } else {
          // otherwise assume network error
          this.$router.push({ name: 'NetworkError' })
        }
      })
  },
  //   computed: {
  //     page() {
  //       return parseInt(this.$route.query.page) || 1 // code to access query parameter e.g. https://page/events?page=4
  //     },
  //   },
}
</script>

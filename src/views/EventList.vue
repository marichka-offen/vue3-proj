<template>
  <h1>Events For Good</h1>
  <!-- <div v-if="showExtra">Extra stuff!</div> -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue' // new Vue3 feature

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    }
  },
  created() {
    // before data mounted; we have access to data, but it's not rendered yet
    watchEffect(() => {
      this.events = null
      EventService.getEvents(2, this.page) // # of events + page #
        .then((res) => {
          this.events = res.data
          this.totalEvents = res.headers['x-total-count']
        })
        .catch(() => {
          this.$route.push({ name: 'NetworkError' })
        })
    })
  },
  computed: {
    hasNextPage() {
      return this.page < this.totalEvents / this.page ? true : false
    },
  },
}
</script>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>

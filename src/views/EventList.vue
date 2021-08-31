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
        v-if="true"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import { watchEffect } from 'vue' // new Vue3 feature

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard,
  },
  //   data() {
  //     return {
  //       headers: 0,
  //     }
  //   },
  created() {
    // before data mounted; we have access to data, but it's not rendered yet
    watchEffect(() => {
      let payload = { events: this.events, limit: 2, page: this.page }
      this.$store.dispatch('getEvents', payload)
    })
  },
  //   methods: {
  //     getHeadersCount() {
  //       this.headers = this.headersCount
  //     },
  //   },
  computed: {
    events() {
      return this.$store.state.events
    },
    // headers() {
    //   return this.$store.state.headers['x-total-count']
    // },
    hasNextPage() {
      return this.page < this.headers / this.page ? true : false
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

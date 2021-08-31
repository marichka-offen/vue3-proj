import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Marichka',
    events: [],
    event: {},
    //headers: {},
  },
  mutations: {
    GET_EVENTS(state, res) {
      state.events = res
      //state.headers = res.headers
    },
    GET_EVENT(state, event) {
      state.event = event
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
  },
  actions: {
    getEvents({ commit }, payload) {
      EventService.getEvents(payload.limit, payload.page).then((res) => {
        commit('GET_EVENTS', res.data)
      })
    },

    getEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id)
      if (existingEvent) {
        commit('GET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then((res) => {
            commit('GET_EVENT', res.data)
          })
          .catch((err) => console.log(err))
      }
    },

    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          // add event to Vuex state
          commit('ADD_EVENT', event)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }, // allows us to perform extra logic like conditionals or wait for an API call to resolve
  modules: {},
})

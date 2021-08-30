<template>
  <p>Register for this event</p>
  <button @click="register">Register</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'], // makes GStore available in this component
  methods: {
    register() {
      // Call to API
      // if success, redirect to Details

      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      // PROGRAMMATIC NAVIGATION
      this.$router.push({
        // .push is an inside method of <router-link>
        // Another option => this.$router.replace => navigates without pushing history event => effective for disabling BACK button => usefull if you have complex form and don't want users to navigate back to

        name: 'EventDetails', // specify the router name we want to redirect to
        // params: { id: this.event.id }, // NOT necessary to specify, gets populated by default
      })

      // this.$router.go(1) => browser forward button
      // this.$router.go(-1) => browser backward button
    },
  },
}
</script>

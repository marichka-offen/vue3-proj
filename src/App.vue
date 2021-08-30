<template>
  <div id="nav">
    <router-link :to="{ name: 'EventList' }">Events</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}
</style>

<!-- 
    LIFECYCLE
    Vue.createApp() -- before lifecycle began

    -beforeCreate- lifecycle hook -- no access to data yet

    Initializing of data and methods

    -created- lifecycle hook --before data mounted; we have access to data, but it's not rendered yet

    Template is compiled

    -beforeMount- lifecycle hook

    Replace #app with compiled template

    -mounted- lifecycle hook -- have access to rendered template

    Vue watches for data changes

    -beforeUpdate- lifecycle hook -- triggers after data updated, but not yet applied to the template

    Apply changes to template

    -updated- lifecycle hook -- triggers when template is updated, but not yet mounted

    (( -beforeUpdate- and -updated- mainly used for debugging, DO NOT use for applying changes for the data. Use COMPUTED and WATCHERS instead ))

    -mounted- back to it again

    -vm.unmount- -- destroy the Vue instance

    -beforeUnmount- lifecycle hook -- triggers before the instance is destroyed, it is still fully functional and present on the page

    Instance destroyed

    -beforeUnmount- lifecycle hook -- everything is gone and inaccessible
 -->

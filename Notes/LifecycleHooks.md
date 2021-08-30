# Lifecycle hooks

`Vue.createApp()` – before lifecycle began

`beforeCreate()` – called synchronously immediately after the instance has been initialized, before data observation and event/watcher setup. No access to data yet.

```
Initializing of data and methods...
```

`created()` – happens before data mounted; we have access to data, computed properties, methods, watch/event callbacks. However, the mounting phase has not been started, and the `$el` property will not be available yet.

```
Template is compiled...
```

`beforeMount()`

```
#app replaced with compiled template...
```

`mounted()` – called after the instance have been mounted. Has access to rendered template.

```
Vue watches for data changes...
```

`beforeUpdate()` – triggers after data updated, but not yet applied to the template.

```
Applying changes to the template...
```

`updated()` – triggers when template is updated, but not yet mounted


> `beforeUpdate()` and `updated()` mainly used for debugging, DO NOT use for applying changes for the data. Use COMPUTED and WATCHERS instead.


`mounted()` – back to it again

`beforeUnmount()` – triggers before the instance is destroyed, it is still fully functional and present on the page.

```
Instance destroyed...
```

`unmounted()` – everything is gone and inaccessible.

#### Extra:

`activated()` and `deactivated()` are called when a kept-alive component is activated.

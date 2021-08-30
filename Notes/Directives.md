# Directives

## v-text
```html
<span v-text="msg"></span>
<!-- same as -->
<span>{{msg}}</span>
```

## v-html
Updates the element's **innerHTML**. 
>**NB!** Risc of Cross Site Scripting(XSS) -- injection of malicious HTML that causes inintended bahavior
```js
...
html: <a href="https://google.com">Google</a>
...
```
```html
<div v-html="html"></div>
```

## v-show
Toggles the element's display CSS property based on the truthy-ness of the expression value.
```html
<h1 v-show="ok">Hello!</h1>
```
>**NB!** Expensive load - cheap toggle

## v-if, v-else, v-else-if
Conditionally render the element based on the truthy-ness of the expression value. The element and its contained directives / components are *destroyed* and re-constructed during toggles, which makes toggle expensive.
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
>**NB!** Cheap on load because it's **lazy**: if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.

## v-for
```html
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```
Alternatively:
```html
<div v-for="(item, index) in items"></div>
<div v-for="(value, key) in object"></div>
<div v-for="(value, name, index) in object"></div>
```

## v-on (@)
Attaches an **event listener** to the element. The usage would be `v-on:click="methodName"` or with the shortcut, `@click="methodName"`.

**Modifiers:**

`.stop` - the click event's propagation will be stopped.

`.prevent` - the submit event will no longer reload the page.

`.capture` - add event listener in capture mode.

`.self` - only trigger handler if event was dispatched from this element.

`.{keyAlias}` - only trigger handler on certain keys.

`.once` - trigger handler at most once.

`.left` - only trigger handler for left button mouse events.

`.right` - only trigger handler for right button mouse events.

`.middle` - only trigger handler for middle button mouse events.

`.passive` - attaches a DOM event with { passive: true }.

**Key Aliases**

`<input @keyup.enter="submit" />`

`.tab`

`.delete` (captures both "Delete" and "Backspace" keys)

`.esc`

`.space`

`.up`

`.down`

`.left`

`.right`

**System Modifier Keys**

You can use the following modifiers to trigger mouse or keyboard event listeners only when the corresponding modifier key is pressed:

`.ctrl`

`.alt`

`.shift`

`.meta`

## v-bind (:)
Dynamically binds one or more **attributes**, or a component prop to an expression.
```html
<!-- bind an attribute -->
<img v-bind:src="imageSrc" />

<!-- dynamic attribute name -->
<button v-bind:[key]="value"></button>

<!-- shorthand -->
<img :src="imageSrc" />

<!-- class binding -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style binding -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>
```

## v-model
Creates a **two-way binding** on a **form input** element or a component.

```html
<input type='text' v-model='firstName'/>
<!-- Binds data().firstName to this input -->
```

**Modifiers**:

`.lazy` - listen to `change` events instead of `input`, updates the data when the focus is out of the input field

`.number` - makes sure the valid input is cast to number, performs type conversion

`.trim` - trims input of extra white space

```html
<input v-model.number.lazy.trim="age" placeholder="Enter your age">
```

## v-cloak
This directive waits for Vue to mount itself, and the moment it does, it removes itself.

Combined with CSS rules such as `[v-cloak] { display: none }`, this directive can be used to hide un-compiled mustache bindings until the component instance is ready.

```html
<div v-cloak>
  {{ message }}
</div>
```

## v-once

Render the element and component **once** only. On subsequent re-renders, the element/component and all its children will be treated as static content and skipped. This can be used to optimize update performance.

```html
<!-- single element -->
<span v-once>This will never change: {{msg}}</span>
<!-- the element have children -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- component -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` directive -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

## :is

Used for dynamic components.



# Lifecycle hooks

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
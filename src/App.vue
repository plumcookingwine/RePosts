<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="">
*{
  margin: 0;
  padding: 0;
  font-size: calc(100 * 360 / 100vw);
}

html, body {
  width: 100%;
  font-size: 1.4rem;
  background: #f5f5f5;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
}

a {
  color: #333333;
  text-decoration: none;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import SideNav from './components/Home'

  export default {
    name: 'app',
    components: {SideNav}
  }
</script>

<style>
  @import "assets/css/bootstrap.min.css";
  @import "assets/css/mk.min.css";
</style>

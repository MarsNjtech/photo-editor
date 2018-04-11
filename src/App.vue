<template>
  <div id="app">
    <navbar v-if="!$store.state.loader.loaded"></navbar>
    <gram v-if="$store.state.loader.loaded"></gram>
    <main class="main">
      <editor ref="editor" v-if="$store.state.loader.loaded"></editor>
      <loader ref="loader" v-else></loader>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
}
.app {
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
  .title {
    color: #ced9da;
    display: block;
    float: left;
    font-size: 18px;
    line-height: 48px;
  }
  .main {
    background-color: #272c32;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 60px;
  }
</style>

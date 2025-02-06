<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
body,
html {
  margin: 0;
  width: 100%;
  height: 100vh;
}
#app {
  height: 100%;
  overflow: hidden;
}

li {
  list-style-type: none;
}
</style>

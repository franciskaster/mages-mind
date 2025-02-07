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
  scrollbar-width: none;
}

#app {
  height: 100%;
  overflow: hidden;
}

li {
  list-style-type: none;
}


.tooltip {
  display: flex;
  justify-content: center;
  align-items: center;
}


.modal-content {
  height: 100%;
  padding: 1rem 0 1rem 0;
}

.modal-content .label:not(:first-child) {
  margin-top: 1rem;
}

.modal-content .textarea,
.modal-content .select,
.modal-content .input {
  width: 100%;
  max-width: unset;
  scrollbar-width: thin;
  resize: none;
}

.modal-action {
  margin-top: 0;
}
</style>

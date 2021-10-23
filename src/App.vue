<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";

export default {
  computed: {
    layout() {
      return "main-layout";
    },
  },
  components: {
    MainLayout,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
#app {
  min-width: 315px;
  max-width: 1440px;
}
</style>

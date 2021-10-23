<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";

export default {
  name: "main-layout",
  data: () => ({
    loading: true,
  }),
  async mounted() {
    this.loading = false;
  },
  components: {
    Navbar,
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error() {
      this.$error("Ошибка");
    },
  },
};
</script>

<style lang="scss">
.app-content {
  padding: 20px;
  transition: padding-left 0.3s;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.app-page {
  width: 100%;
}
</style>
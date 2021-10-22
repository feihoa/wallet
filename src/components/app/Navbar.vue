<template>
  <nav class="navbar blue lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <span class="black-text navbar__date">{{ date | date("datetime") }}</span>
          <div class="navbar__pages-links">
          <router-link
          v-for="link in links"
          class="navbar__page-link"
          :key="link.url"
          tag="li"
          :to="link.url"
          :exact="link.exact"
        >
            <a href="#" class=" waves-effect waves-orange pointer black-text">{{ link.title }}</a>
          </router-link>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
     links: [
      { title: "Обменный курс", url: "/" },
      { title: "Счет", url: "/bill", exact: true },
    ],
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    try {
      this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: false,
      });
    } catch (e) {}
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  computed: {
    name() {
      return "Имя"
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
  .navbar{
    position: fixed;
    z-index:100;
    &__date{
      margin-left: 10px;
    }
    &__pages-links{
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
      min-width: 155px;
    }
    &__page-link {
      text-decoration: none;
      list-style-type: none;
          text-align: center;

    }
  }
  .navbar-left{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
</style>
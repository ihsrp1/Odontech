<template lang="pug">
  v-app.default_background
    HomeLayout(v-if='!isLogin')
    template(v-else)
      .image_login
      LoginLayout
</template>

<script>
import LoginLayout from '../src/layouts/LoginLayout'
import HomeLayout from '../src/layouts/HomeLayout'

export default {
  components: {
    LoginLayout,
    HomeLayout
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'Some Default Title';
      }
    },
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login"
    }
  }
}
</script>

<style>
.default_background {
  background-color: #eee!important;
}
.image_login {
  background-image: url("../public/img/OdontoTech.jpeg") !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  display: block;
  width: 100vw;
  height: 100vh;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
.card_radius_drawer {
  border-top-right-radius: 8px !important;
  border-top-left-radius: 8px !important;
}
</style>

<template lang="pug">
  v-container.height100.background_overlay
    v-row.height100
      v-col(align-self='center')
        Login
</template>

<script>
import Login from '../views/Login'
export default {
  name: 'LoginLayout',
  components: {
    Login
  }
}
</script>

<style scoped>
.height100 {
  height: 100vh;
}
.background_overlay {
  max-width: none;
  width: 100%;
  background: rgba(187, 222, 251, 0.6);
}
</style>
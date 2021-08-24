<template lang="pug">
  v-card.mx-auto(max-width='400' rounded='lg' style='z-index: 2')
    div.header_div
      h1(style='color: white;') OdontoTech
      span(style='color: white;') Login
    v-card-text.text--primary
      v-row
        v-col(cols='12')
          v-text-field(v-model='email'  @keyup.enter='login()' label='Email' hide-details filled rounded dense)
        v-col(cols='12')
          v-text-field(v-model='password' @keyup.enter='login()' label='Senha' type='password' hide-details filled rounded dense)
    v-card-actions
      v-spacer
      v-btn(@click='login()' color='orange' text)
        | Entrar
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log(this.$store)
      let auth = false
      let type = '', image = ''
      const users = this.$store.getters['loginInformation/getUsers']
      users.forEach((item) => {
        if (item.email === this.email) {
          type = item.type
          image = item.image
          auth = true
        }
      })
      if (auth) {
        const user = {
          email: this.email,
          type,
          image
        }
        console.log(user)
        this.$store.dispatch('loginInformation/changeUser', user)
        this.$router.push("/agendamento")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuário incorreto.'
        })
      }
    }
  }
}
</script>

<style>
.header_div {
  height: 100px;
  width: 100%;
  background-color: #2962FF !important;
  padding: 16px;
}
.swal2-container {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}
</style>

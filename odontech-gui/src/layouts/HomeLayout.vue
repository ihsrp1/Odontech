<template lang="pug">
  span
    v-app-bar(app color='blue accent-4' dark flat)
      v-avatar.mr-10(color='grey darken-1' size='32')
        v-img(:src='user.image')
      v-toolbar-title OdontoTech
      v-spacer
      v-btn(@click='goTo(item)' v-for='item in menus' :key='item.icon' text)
        v-icon.mr-1 {{ item.text === "Sair" ? item.icon  : '' }}
        | {{ item.text }}
    v-main.grey.lighten-3
      v-container(
        style='padding-right: 30px; padding-left: 30px;'
        :style='$vuetify.breakpoint.lgAndUp ? "max-width: 1785px;" : "max-width: none;"')
        v-row
          v-col(v-if='!$vuetify.breakpoint.smAndDown' cols='2')
            v-sheet(rounded='lg')
              v-sheet.pa-4.card_radius_drawer(color='grey lighten-4')
                v-avatar.mb-4(color='grey darken-1' size='64')
                  v-img(:src='user.image')
                div(style='text-overflow: hidden; max-width: 100%;') {{ user.email }}
              v-divider
              v-list(color='transparent' flat light)
                v-list-item(@click='goTo(item)' v-for='item in menus' :key='item.icon' link)
                  v-list-item-icon
                    v-icon(:color='isRoute(item.path) ? "primary" : ""') {{ item.icon }}
                  v-list-item-content
                    v-list-item-title {{ item.text }}
          v-col
            router-view
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.getters['loginInformation/activeUser']
    }
  },
  data() {
    return {
      menus: [
        {
          text: 'Agendamento',
          icon: 'mdi-calendar',
          path: '/agendamentos'
        },
        {
          text: 'Sair',
          icon: 'mdi-logout',
          path: '/login'
        }
      ]
    }
  },
  methods: {
    goTo(item) {
      if (this.$route.path !== item.path) {
        if (item.path === '/login') {
          this.$store.dispatch('loginInformation/changeUser', {})
        }
        this.$router.push(item.path)
      }
    },
    isRoute(path) {
      return this.$route.path === path
    }
  }
}
</script>

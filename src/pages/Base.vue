<template>
  <v-app id="base">
    <v-navigation-drawer v-model="drawer" app color="indigo" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Respondidos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <div v-for="item in items" :key="item.name">
          <v-btn block text left :to="item.path">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="logout" block text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Respondidos</v-toolbar-title>
    </v-app-bar>

    <v-content app fluid>
      <transition mode="out-in">
          <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data () {
      return {
        drawer: false,
        items: [
          { name: 'Turmas', icon: 'mdi-home-city', path: '/turmalist' },
          { name: 'Perguntas', icon: 'mdi-account', path: '/' },
          { name: 'Quizes', icon: 'mdi-account-group-outline', path: '/' },
        ],
        mini: true,
      }
    },
    created() {
       
    },
    methods: {
      logout() {
        this.$router.push('login')
      }
    }
}
</script>

<style scoped>
</style>

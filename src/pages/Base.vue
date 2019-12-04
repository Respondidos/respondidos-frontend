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
      <v-spacer></v-spacer>
      <v-row class="justify-end align-center">
        <v-col cols="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-row class="justify-end align-center">
                  <v-col cols="auto" justify-self="end">
                    <v-spacer> </v-spacer>
                    <v-list-item-avatar>
                  <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
                </v-list-item-avatar>
                  </v-col>
                  <v-col cols="auto">
                <v-list-item-title class="text-sm-left"> {{user.firstName}} {{user.lastName}} </v-list-item-title>
                <v-list-item-subtitle class="text-sm-left"> Level {{user.level}} XP: {{user.experience}} </v-list-item-subtitle>
                  </v-col>
                </v-row>
                
              </v-list-item-content>
            </v-list-item>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content app fluid>
      <transition mode="out-in">
          <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
    data () {
      return {
        drawer: false,
        items: [
          { name: 'Quizzes', path: '/quizzes' },
          { name: 'Questões', icon: 'mdi-account-group-outline', path: '/questoes' },
        ],
        user: {}
      }
    },
    async created() {
      /* eslint-disable */
      const instance = axios.create({
          baseURL: 'http://localhost:8888',
          headers: {'authorization':  `Bearer ${localStorage.token}`}
      });
      const res = await instance.get('/user/')
      console.log("user: ", res.data)
      this.user = res.data
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

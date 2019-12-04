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
                    :src="userAvatar"
                    alt="user avatar"
                    style="cursor: pointer;"
                    @click="avatarDialog = !avatarDialog"
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
      <v-dialog
        v-model="avatarDialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Mudar avatar
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col 
                v-for="option in avatarOptions"
                :key="option"
                cols="3"
                :class="option === user.avatar ? 'avatar-item-selected' : 'avatar-item'"
                @click="changeUserAvatar(option)"
                >
                <v-img
                  :src="convertAvatarToUrl(option)"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="avatarDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="avatarDialog = false"
            >
              Alterar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        user: {},
        userAvatar: '',
        avatarDialog: false,
        avatarOptions: []
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
      this.userAvatar = this.convertAvatarToUrl(this.user.avatar)
      this.avatarOptions = this.getAvatarOptions()
      console.log(this.avatarOptions)
    },
    methods: {
      logout() {
        this.$router.push('login')
      },
      convertAvatarToUrl(avatar) {
        const avatarImage = require(`../assets/avatars/${avatar}.png`)
        return avatarImage ? avatarImage : ''
      },
      getAvatarOptions() {
        let options = []
        for (let i = 1 ; i <= 151 ; i++) {
          options.push(this.formatNumber(i, 3))
        }
        return options;
      },
      formatNumber(number, digits) {
        let newNumber = number.toString()
        for (let i = newNumber.length ; i < digits ; i++) {
          newNumber = '0'.concat(newNumber)
        }
        return newNumber;
      },
      async changeUserAvatar(avatar) {
        const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  `Bearer ${localStorage.token}`}
        });
        const res = await instance.put('/user/avatar', {
          avatar
        })
        if (res.data.avatar) {
          this.user = res.data
          this.userAvatar = this.convertAvatarToUrl(res.data.avatar)
          this.avatarDialog = false
        }
      }
    },
}
</script>

<style scoped>
  .avatar-item {
    cursor: pointer;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .avatar-item-selected {
    opacity: 1.0;
    filter: alpha(opacity=100);
  }
  .avatar-item:hover {
    opacity: 1.0;
    filter: alpha(opacity=100);
  }
</style>

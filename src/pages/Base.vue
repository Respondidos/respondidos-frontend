<template>
    <v-app id="base">
    <!-- <v-navigation-drawer v-model="drawer" app clipped color="primary" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <div
        v-for="item in items"
          :key="item.name">
        <v-btn block text left :to="item.link">
        <v-list-item
        >
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
    <v-toolbar dense app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar> -->
        <v-content fluid>
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
          { name: 'Home', icon: 'mdi-home-city' },
          { name: 'My Account', icon: 'mdi-account' },
          { name: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
      }
    },
    created() {
       
    },
    methods: {

    }
}
</script>

<style scoped>
</style>

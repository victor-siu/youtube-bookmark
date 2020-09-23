<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-avatar class="white mr-3">
        <v-icon class="primary--text">
          mdi-youtube
        </v-icon>
      </v-avatar>
      <v-toolbar-title>
        YouTube Bookmark
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

    </v-app-bar>

    <nav-drawer/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from '../components/NavDrawer'

export default {
  name: 'App',

  components: {
    NavDrawer
  },

  data: () => ({
    //
  }),
};
</script>

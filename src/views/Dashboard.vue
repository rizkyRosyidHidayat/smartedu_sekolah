<template>
  <v-app>
    <Sidebar :permanent="permanent" />

    <v-app-bar app dense elevation="0" class="se-primary" dark>
      <v-app-bar-nav-icon 
        class="d-flex d-lg-none"
        @click.stop="permanent = !permanent"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        SMK NU Kesesi
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="pa-6">
        <router-view></router-view>
      </div>
    </v-main>    

    <v-footer app absolute bottom inset class="py-3" color="grey lighten-2">
      &copy; {{ new Date().getUTCFullYear() }} SMK NU Kesesi. AllRight Reserved
    </v-footer>
  </v-app>
</template>

<script>
  import { 
    VApp, 
    VMain, 
    VFooter,
    VAppBar,
    VAppBarNavIcon,
    VToolbarTitle
  } from 'vuetify/lib'
  import Sidebar from '@/components/Sidebar'

  export default {
    components: {
      VApp,
      VMain,
      VFooter,
      VAppBar,
      VAppBarNavIcon,
      VToolbarTitle,
      Sidebar
    },

    data: () => ({
      permanent: false
    })
  }
</script>

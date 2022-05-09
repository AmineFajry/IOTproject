<template>
  <v-app>
    <v-app-bar app>
      <Header></Header>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header.vue"

export default {
  name: 'App',
  components:{
    Header
    }
};
</script>

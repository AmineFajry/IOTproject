<template>
    <v-tabs fixed-tabs background-color="#162130" dark>
        <v-tab v-on:click="logout(link)" v-for="(link,index) in links" :key="index" :to="link.path">
            {{ link.title }}
        </v-tab>
    </v-tabs>
</template>

<script>
import router from "@/router";
import {mapActions, mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data: () => ({
        links: [
            {title:'Badge', path:'/badges'},
            {title:'Objets connectés', path:'/iot'},
            {title:"Historique d'accès", path:'/'},
            {title:'Connecter', path:'/'},
            {title:'Déconnecter', path:'/logout'},
        ],
    }),
    mounted(){
    },
    methods: {
        ...mapActions(["deauthenticate"]),
        logout(link) {
           if(link.path === "/logout" && this.user.token && this.user.email) {
                this.deauthenticate().then(()=> {
                  router.push({path: "/"})
                  localStorage.removeItem("email");
                  localStorage.removeItem("token");
                  window.location.reload();
                });
           }
        }
    },
  computed:{
    ...mapGetters(["user"]),
  }
}

</script>
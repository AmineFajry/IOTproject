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
        ],
    }),
    mounted(){
      this.prepareLink()

    },
    methods: {
        ...mapActions(["deauthenticate"]),
        logout(link) {
           if(link.path === "/logout" && this.user.token && this.user.email) {
                this.deauthenticate().then(()=> {
                  this.prepareLink()
                  router.push({path: "/login"})
                  localStorage.removeItem("email");
                  localStorage.removeItem("token");
                  localStorage.removeItem("id");
                  localStorage.removeItem("authenticating");
                  window.location.reload();
                });
           }
        },
      prepareLink(){
        const authLink = [
          {title:'Badge', path:'/badges'},
          {title:'Objets connectés', path:'/iot'},
          {title:"Historique d'accès", path:'/historique'},
          {title:'Déconnecter', path:'/logout'},
        ]
        const nonAuth = [
          {title:'Connecter', path:'/'},
        ]
        if(this.authenticating){
          this.links = authLink
        }else{
          this.links = nonAuth
        }
      }
    },
  computed:{
    ...mapGetters(["user","authenticating"])
  },
  watch: {
    // whenever question changes, this function will run
    authenticating(newAuthenticating, oldAuthenticating) {
      if (newAuthenticating !== oldAuthenticating) {
          this.prepareLink()
      }
    }
  },
}

</script>
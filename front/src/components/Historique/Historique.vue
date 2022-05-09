<template>
  <div>
    <h1 class="text-center">Historique des accès</h1>
    <v-data-table
        :headers="header"
        :items="historique"
    >
    </v-data-table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Historique",
  data(){
    return {
      header:[
        {
          text:'Objet connecté',
          value:'objet_name'
        },
        {
          text:'Adresse du badge',
          value:'badge_addr'
        },
        {
          text:'nom',
          value:'badge_nom'
        },
        {
          text:'prénom',
          value:'badge_prenom'
        }
      ],
      historique:[]
    }
  },
  mounted: function () {
    this.getHistorique().then(result=>{
      console.log(result)
    })
  },
  methods:{
    ...mapActions(['getHistorique'])
  },
  computed:{

  }
}
</script>

<style scoped>

</style>
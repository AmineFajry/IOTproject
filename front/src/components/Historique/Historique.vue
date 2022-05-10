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
          value:'addrMac'
        },
        {
          text:'Adresse du badge',
          value:'badgeAddress'
        },
        {
          text:'nom',
          value:'prenom'
        },
        {
          text:'prénom',
          value:'nom'
        },
        {
          text:'Date',
          value:'date'
        }
      ],
      historique:[]
    }
  },
  mounted() {
    this.getHistorique().then(result=>{
      const historique = result.data.message

      this.getBadges().then(result=>{
        const badges = result.data.message


       historique.map(_machine =>{
           _machine.Historics.map(_historic =>{
            let badge = badges.find(_badge => _badge.id === _historic.BadgeId)

            this.historique.push({
              addrMac:_machine.addrMac,
              badgeAddress:badge.badgeAddress,
              prenom:badge.prenom,
              nom:badge.nom,
              date:badge.createdAt
            })

          })
        })


      })


    })
  },
  methods:{
    ...mapActions(['getHistorique','getBadges'])
  },
  computed:{

  }
}
</script>

<style scoped>

</style>
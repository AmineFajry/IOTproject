<template>
  <v-container>
      <h1 class="text-center">Historique des accès</h1>
    <v-row>
          <v-select
              class="col-md-3"
              :items="objectAddr"
          >
          </v-select>
          <v-select
              class="col-md-3 offset-1">
          </v-select>
    </v-row>
      <v-data-table
          :headers="header"
          :items="historique"
      >
      </v-data-table>
    </v-container>
</template>
<script>
import {mapActions} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Historique",
  data(){
    return {
      objectAddr:[],
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
            if(!this.objectAddr.includes(_machine.addrMac)){
              this.objectAddr.push(_machine.addrMac)
            }
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
<template>
  <v-container>
      <h1 class="text-center">Historique des accès</h1>
    <v-row>
          <v-select
              class="col-md-3"
              label="Objet connecté"
              :items="objectAddrSelect"
          >
          </v-select>
          <v-select
              class="col-md-3 offset-1"
              label="Badge"
              :items="badgeSelect"
              v-model="badgeSelected"
              @input="filterByBadge"
          >
          </v-select>
    </v-row>
      <v-data-table
          :headers="header"
          :items="historiqueData"
      >
      </v-data-table>
    </v-container>
</template>
<script>
import {mapActions,mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Historique",
  data(){
    return {
      objectAddrSelect:[],
      badgeSelect:[],
      badgeSelected:'',
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
      historiqueData:[]
    }
  },
  mounted() {
    this.getHistorique().then(result=>{
      const historique = result.data.message

      this.getBadges().then(result=>{
        const badges = result.data.message

       historique.map(_machine =>{
            if(!this.objectAddrSelect.includes(_machine.addrMac)){
              this.objectAddrSelect.push(_machine.addrMac)
            }
           _machine.Historics.map(_historic =>{
            let badge = badges.find(_badge => _badge.id === _historic.BadgeId)
             if(!this.badgeSelect.includes(badge.badgeAddress)){
               this.badgeSelect.push(badge.badgeAddress)
             }
            this.historiqueData.push({
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
    ...mapActions(['getHistorique','getBadges']),
    filterByBadge(){
      console.log( this.badgeSelected)
      console.log(this.historique)
      this.historiqueData = this.historique.filter(_hist => {
          return _hist.badgeAddress === this.badgeSelected
        })
    }
  },
  computed:{
    ...mapGetters(['historique']),

  }
}
</script>

<style scoped>

</style>
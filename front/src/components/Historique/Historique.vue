<template>
  <v-container>
      <h1 class="text-center">Historique des accès</h1>
    <v-row>
          <v-select
              class="col-md-3"
              label="Objet connecté"
              :items="objectAddrSelect"
              v-model="objectSelected"
              @input="filter"
          >
          </v-select>
          <v-select
              class="col-md-3 offset-1"
              label="Badge"
              :items="badgeSelect"
              v-model="badgeSelected"
              @input="filter"
          >
          </v-select>
    </v-row>
      <v-data-table
          :headers="header"
          :items="historiqueData"
      >
        <template v-slot:[`item.date`]="{ item }">
          {{ formatDate(item.date) }}
        </template>
      </v-data-table>
    </v-container>
</template>
<script>
import {mapActions} from "vuex";
import moment from "moment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Historique",
  data(){
    return {
      objectAddrSelect:['tout les objets'],
      objectSelected:'tout les objets',
      badgeSelect:['tout les badges'],
      badgeSelected:'tout les badges',
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
      historiqueData:[],
      historique:[]
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
    this.historique = this.historiqueData
  },
  methods:{
    ...mapActions(['getHistorique','getBadges']),
    filter(){
      if(this.badgeSelected !== this.badgeSelect[0] && this.objectSelected !== this.objectAddrSelect[0]){
        this.historiqueData = this.historique.filter(_hist => {
          return _hist.badgeAddress === this.badgeSelected && _hist.addrMac === this.objectSelected
        })
      }
      else if(this.badgeSelected !== this.badgeSelect[0]){
        this.historiqueData = this.historique.filter(_hist => {
          return _hist.badgeAddress === this.badgeSelected
        })
      }else if(this.objectSelected !== this.objectAddrSelect[0]){
        this.historiqueData = this.historique.filter(_hist => {
          return _hist.addrMac === this.objectSelected
        })
      }
      else{
        this.historiqueData = this.historique
      }
    },
    formatDate(date){
      return moment(date).format('LLLL')
    }
  },
  computed:{
  }
}
</script>

<style scoped>

</style>
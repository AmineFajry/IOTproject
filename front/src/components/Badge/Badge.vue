<template>
  <v-container>

  <h1 class="text-center">Liste des badges</h1>
    <CreateBadge @click="createBadge"></CreateBadge>
      <v-data-table
          :headers="header"
          :items="badges"
      >
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatDate(item.createAt) }}
        </template>
        <template v-slot:[`item.autorisation`]="{ item }">
          <v-icon v-if="item.autorisation"
              small
              color="green"
              class="mr-2"
          >
            mdi-check
          </v-icon>
          <v-icon v-else
                  color="red"
                  small
                  class="mr-2"
          >
            mdi-close
          </v-icon>
        </template>
        
        <template v-slot:[`item.actions`]="{ item }">
          <EditBadge :id="item.id" @click="updateBadge">
          </EditBadge>
          <v-icon
              small
              @click="deleteBadge(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
import CreateBadge from "@/components/EditBadge/EditBadge";
import EditBadge from "@/components/CreateBadge/CreateBadge";
import moment from "moment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Badge",
  components:{CreateBadge, EditBadge},
  data(){
    return{
      badges:[],
      header:[
        {
          text: 'Adresse du badge',
          value: 'badgeAddress',
        },
        {
          text: 'Nom',
          value: 'nom',
        },
        {
          text: 'Prénom',
          value: 'prenom',
        },
        {
          text: 'Est autorisé',
          value: 'autorisation',
        },
        {
          text: 'Date de création',
          value: 'createdAt',
        },
        {
          text: 'Actions',
          value: 'actions',
        }
      ]
    }
  },
  mounted() {
    this.getBadges().then(result=>{
      this.badges = result.data.message
    })
  },
  computed:{
    ...mapGetters(['user'])
  },
  methods:{
    ...mapActions(['getBadges','removeBadge','editBadge','storeBadge']),
    deleteBadge(id){
      this.removeBadge({id}).then(result=>{
      console.log(result)
      })
    },
    updateBadge(data){
      this.editBadge({badge:data.badge}).then(result=>{
        console.log(result)
        data.dialog.value = false
      })
    },
    createBadge: function (data) {
      data.badge.user_id = this.user.id
      console.log(this.user.id)
      this.storeBadge({badge: data.badge}).then(result => {
        console.log(result)
        data.dialog.value = false
      })
    },
    formatDate(date){
      return moment(date).format('LLLL')
    }
  }
}
</script>

<style scoped>

</style>
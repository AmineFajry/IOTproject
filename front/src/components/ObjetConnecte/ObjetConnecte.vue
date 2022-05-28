<template>
  <v-container>
        <h1 class="text-center">Partie microcontrôleur</h1>
        <CreateObjetConnecte @click="createIOT"></CreateObjetConnecte>
        <v-data-table
        :headers="headers"
        :items="rows"
        >
            <template v-slot:[`item.createdAt`]="{ item }">
                {{ formatDate(item.createdAt) }}
            </template>
            <template v-slot:[`item.autorisation`]="{ item }">
                <v-icon v-if="item.autorisation" small color="green" class="mr-2">mdi-check</v-icon>
                <v-icon v-else color="red" small class="mr-2"> mdi-close </v-icon>
            </template>

            <template v-slot:[`item.actions`]="{ item }">

            <EditObjetConnecte :id="item.id" :addrMac="item.addrMac" :seuil-luminosite="item.seuilLuminosite" @click="updateIOT"/>

            <v-icon small @click="deleteIOT(item.id)">mdi-delete</v-icon>

        </template>

        </v-data-table>
    </v-container>
</template>

<script>
import CreateObjetConnecte from "@/components/ObjetConnecte/CreateObjetConnecte";
import EditObjetConnecte from "@/components/ObjetConnecte/EditObjetConnecte";
import { mapActions,mapGetters } from "vuex";
import moment from "moment";

export default {
    name:"ObjetConnecté",
    components:{CreateObjetConnecte,EditObjetConnecte},
    data(){
        return{
          headers: [
          { text: 'Idantifient', value: 'id' },
          { text: 'Adresse Mac', value: 'addrMac' },
          { text: 'Seuil de Luminosité', value: 'seuilLuminosite'},
          { text: 'Date de création', value: 'createdAt' },
          { text: 'Actions', value: 'actions' }
        ],
        rows: []
        }
    },
    mounted:function(){
        this.getIOTdata().then(response => {
          this.rows = response.data
        })
    },
    methods:{
        ...mapActions(['getIOTdata','deleteIOTdata','postIOTData','updateLightSensor']),
        createIOT(data) {
            this.postIOTData({iot:data.iot}).then(result => {
                console.log(result)
                data.dialog.value = false
            })
        },
        deleteIOT(id){
          this.deleteIOTdata({id}).then(result=>{
            console.log(result)
          })
        },
        updateIOT(data){
          console.log(data.iot)
            this.updateLightSensor({iot:data.iot}).then(result=>{
                console.log(result)
                data.dialog.value = false
            })
        },
        formatDate(date){
            return moment(date).format('LLLL')
        }
    },
    computed:{
       ...mapGetters(['user'])
    }
}
</script>

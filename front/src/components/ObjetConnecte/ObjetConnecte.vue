<template>
    <div> 
        <h1 class="text-center">Partie microcontrôleur</h1>
        <CreateObjetConnecte @click="createIOT"></CreateObjetConnecte>
        <v-data-table
        :headers="headers"
        :items="rows"
        >
            <template v-slot:[`item.autorisation`]="{ item }">
                <v-icon v-if="item.autorisation" small color="green" class="mr-2">mdi-check</v-icon>
                <v-icon v-else color="red" small class="mr-2"> mdi-close </v-icon>
            </template>

            <template v-slot:[`item.actions`]="{ item }">

            <EditObjetConnecte :id="item.id" @click="updateIOT"/>

            <v-icon small @click="deleteIOT(item.id)">mdi-delete</v-icon>

        </template>

        </v-data-table>
    </div> 
</template>

<script>
import CreateObjetConnecte from "@/components/ObjetConnecte/CreateObjetConnecte";
import EditObjetConnecte from "@/components/ObjetConnecte/EditObjetConnecte";
import { mapActions,mapGetters } from "vuex";
export default {
    name:"ObjetConnecté",
    components:{CreateObjetConnecte,EditObjetConnecte},
    data(){
        return{
          headers: [
          { text: 'Idantifient', value: 'id' },
          { text: 'Numéro User', value: 'user_id' },
          { text: 'Adresse Mac', value: 'addrMac' },
          { text: 'Seuil de Luminosité', value: 'seuilLuminosite'},
          { text: 'Date de création', value: 'createdAt' },
          { text: 'Actions', value: 'actions' }
        ],
        rows: []
        }
    },
    mounted:function(){
        this.getIOTdata().then(response =>{this.rows = response.data})
    },
    methods:{
        ...mapActions(['getIOTdata','deleteIOTdata','postIOTData','updateLightSensor']),
        createIOT: function (data) {
            data.iot.user_id = this.user.id
            console.log(data)
        },
        deleteIOT(id){
          this.deleteIOTdata({id}).then(result=>{
            console.log(result)
          })
        },
        updateIOT(data){
            console.log(data)
        },
    },
    computed:{
       ...mapGetters(['user'])
    }
}
</script>

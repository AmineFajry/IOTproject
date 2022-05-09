<template>
    <v-data-table
    :headers="headers"
    :items="rows"
    hide-default-footer 
    >
    <template v-slot:[`item.actions`]="{}">
            <v-icon
                small
                class="mr-2"
                >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
    
</template>

<script>
import { mapActions } from "vuex";
export default {
    name:"ObjetConnecté",
    components:{},
    data(){
        return{
          dialog: false,
          dialogDelete: false,
          headers: [
          { text: 'Idantifient', value: 'id' },
          { text: 'Numéro User', value: 'user_id' },
          { text: 'Adresse Mac', value: 'addrMac' },
          { text: 'Seuil de Luminosité', value: 'seuilLuminosite'},
          { text: 'Ajouté le', value: 'createdAt' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        rows: [
          {
            id: null,
            addrMac: '',
            seuilLuminosite: '',
            user_id: null,
            createdAt: '',
          }
        ],
        }
    },
    mounted:function(){
        this.getIOTdata().then(response =>{
            try{
                let data = response.data
                data.forEach(_data => {
                    this.rows = [{
                        id:_data.id,
                        addrMac: _data.addrMac,
                        seuilLuminosite: _data.seuilLuminosite,
                        user_id: _data.user_id,
                        createdAt: _data.createdAt
                    }]
                });
          
            } catch (error) {
                 console.error("Parsing error:", error);
            }
        })
    },
    methods:{
     ...mapActions(['getIOTdata','deleteIOTdata','postIOTData','updateLightSensor']),
    },
    computed:{
    }
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    hide-default-footer
  ></v-data-table>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name:"ObjetConnecte",
    components:{},
    data(){
        return{
          headers: [
          { text: 'Idantifient', value: 'id' },
          { text: 'Adresse Mac', value: 'addrMac' },
          { text: 'Seuil de Luminosité', value: 'seuilLuminosite'},
          { text: 'Numéro User', value: 'user_id' },
          { text: 'Crée', value: 'createdAt' },
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
     ...mapActions(['getIOTdata']),
    },
    computed:{}
}
</script>

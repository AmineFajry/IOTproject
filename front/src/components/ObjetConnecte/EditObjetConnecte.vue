<template>
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
          >
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
                color="primary"
                dark
            ></v-toolbar>
            <v-card-text>
             <v-text-field
                label="Adresse MAC"
                v-model="iot['addrMac']"
                readonly
             >
             </v-text-field>
              <v-text-field
                  label="Seuil de Luminosité"
                  v-model="iot['seuilLuminosite']"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                  text
                  color="red"
                  @click="dialog.value = false"
              >Annuler</v-btn>
              <v-btn
                  text
                  color="green"
                  @click="$emit('click',{iot,dialog})"
              >Valider</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "EditObjetConnecte",
  props:['id','addrMac'],
  data(){
    return{
      iot:{
        id: null,
        addrMac: '',
        seuilLuminosite: '',
        user_id: null,
        createdAt: '',
      }
    }
  },
  mounted() {
      this.iot.addrMac = this.addrMac
  },
  computed:{
    ...mapGetters([''])
  },
  methods:{
  },
}
</script>

<style scoped>

</style>
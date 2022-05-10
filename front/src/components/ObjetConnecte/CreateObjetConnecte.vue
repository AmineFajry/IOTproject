<template>
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              class="mr-2 primary"
              v-bind="attrs"
              v-on="on"
          >
            Ajouter un microcontrôleur
          </v-btn>
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
  name: "CreateObjetConnecte",
  props:['id'],
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
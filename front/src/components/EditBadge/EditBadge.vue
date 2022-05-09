<template>
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              class="mr-2"
              v-bind="attrs"
              v-on="on"
          >
            Ajouter un badge
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
                label="Adresse du badge"
                v-model="badge['badgeAddress']"
             >
             </v-text-field>
              <v-text-field
                  label="Prenom du possesseur du badge"
                  v-model="badge['prenom']"
              >
              </v-text-field>
              <v-text-field
                  label="Nom du possesseur du badge"
                  v-model="badge['nom']"
              >
              </v-text-field>

              <label>Autorisation : </label>
              <v-switch
                  v-model="badge['autorisation']"
                  label=""
              ></v-switch>

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
                  @click="$emit('click',{badge,dialog})"
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
  name: "editBadge",
  data(){
    return{
      badge:{
        badgeAddress:'',
        prenom:'',
        nom:'',
        autorisation:'',
        user_id:''
      }
    }
  },
  mounted() {
  },
  computed:{
    ...mapGetters(['badges'])
  },
  methods:{
  },
}
</script>

<style scoped>

</style>
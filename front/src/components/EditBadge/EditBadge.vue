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
          <v-form ref="form" v-model="valid" lazy-validation>

          <v-card>
            <v-toolbar
                color="primary"
                dark
            ></v-toolbar>
            <v-card-text>
             <v-text-field
                label="Adresse du badge"
                v-model="badge['badgeAddress']"
                :rules="rules"
             >
             </v-text-field>
              <v-text-field
                  label="Prenom du possesseur du badge"
                  v-model="badge['prenom']"
                  :rules="rules"

              >
              </v-text-field>
              <v-text-field
                  label="Nom du possesseur du badge"
                  v-model="badge['nom']"
                  :rules="rules"

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
                  @click="cancel(dialog)"
              >Annuler</v-btn>
              <v-btn
                  text
                  color="green"
                  @click="submit(dialog)"
              >Valider</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </template>
      </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CreateBadge",
  props:['id'],
  data(){
    return{
      badgePrevious:{},
      badge:{},
      valid:true,
      rules: [
        v => !!v || 'le champ est obligatoire',
      ],
    }
  },
  mounted() {
    const findBadge = this.badges.find(_badges =>{
      return _badges.id === this.id
    })
    this.badge = {...findBadge}
  },
  computed:{
    ...mapGetters(['badges'])
  },
  methods:{
    cancel(dialog){
      dialog.value = false
    },
    submit(dialog){
      if(this.$refs.form.validate()){
        this.$emit('click',{badge:this.badge,dialog})
      }
    }
  },
}
</script>

<style scoped>

</style>
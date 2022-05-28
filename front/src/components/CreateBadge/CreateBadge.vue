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
            <v-form ref="form" v-model="valid" lazy-validation>
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
                    @click="dialog.value = false"
                >Annuler</v-btn>
                <v-btn
                    text
                    color="green"
                    @click="submit(dialog)"
                >Valider</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "editBadge",
  data(){
    return{
      valid: true,
      rules: [
        v => !!v || 'le champ est obligatoire',
      ],
      badge:{
        badgeAddress:'',
        prenom:'',
        nom:'',
        autorisation:0,
        user_id:'',
      }
    }
  },
  mounted() {
  },
  computed:{
  },
  methods:{
    submit(dialog){
      if(this.$refs.form.validate()){
        this.$refs.form.resetValidation()
        const badge = {...this.badge}
        this.$emit('click',{badge,dialog})
        this.clearInput()
      }
    },
    clearInput(){
      Object.keys(this.badge).map(_key=>{
        if(typeof this.badge[_key] === 'string'){
          this.badge[_key] = ''
        }else if(typeof this.badge[_key] === 'number' || typeof this.badge[_key] === 'boolean'){
          this.badge[_key] = 0
        }
      })
    }
  },
}
</script>

<style scoped>

</style>
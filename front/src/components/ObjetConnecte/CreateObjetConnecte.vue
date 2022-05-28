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
            Ajouter un microcontrôleur
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
                  label="Adresse MAC"
                  v-model="iot['addrMac']"
                  :rules="rules"
               >
               </v-text-field>
                <v-text-field
                    label="Seuil de Luminosité"
                    v-model="iot['seuilLuminosite']"
                    :rules="rules"
                    type="number"
                    min="0"
                >
                </v-text-field>
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
            </v-form>
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
      valid:true,
      rules: [
        v => !!v || 'le champ est obligatoire',
      ],
      iot:{
        addrMac: '',
        seuilLuminosite: null,
      }
    }
  },
  mounted() {

  },
  computed:{
    ...mapGetters(['microcs','user'])
  },
  methods:{
    cancel(dialog){
      dialog.value = false
    },
    submit(dialog){
      if(this.$refs.form.validate()){
        this.$refs.form.resetValidation()

        const iot = {...this.iot}
        iot.user_id = this.user.id

        this.$emit('click',{iot,dialog})
        this.clearInput()
      }
    },
    clearInput(){
      Object.keys(this.iot).map(_key=>{
        if(typeof this.iot[_key] === 'string'){
          this.iot[_key] = ''
        }else if(typeof this.iot[_key] === 'number' || typeof this.iot[_key] === 'boolean'){
          this.iot[_key] = 0
        }
      })
    }
  },
}
</script>

<style scoped>

</style>
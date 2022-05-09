<template>
  <div>
    <v-alert
        :class="!messageError ? 'hidden' : 'display'"
        border="top"
        color="red"
        dark
    >
      {{ messageError }}
    </v-alert>


      <v-form ref="form" v-model="valid" lazy-validation>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Mot de passe"
            hint="At least 4 characters"
            counter
            @click:append="show1 = !show1"
            @keyup.enter="validate"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            @keyup.enter="validate"
          >
            Se connecter
          </v-btn>
    </v-form>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions,mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
      return {
          valid: true,
          messageError : '',
          email: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
          select: null,
          show1: false,
          password: '',
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters',
            emailMatch: () => (`The email and password you entered don't match`),
          },
      }
    },
    mounted() {
    },
    updated() {
    },
    props: ["errorMessage"],
    computed: {
      ...mapGetters(["user"]),
    },
    methods: {
      ...mapActions(['login']),
      validate () {
        this.$refs.form.validate();
        this.login({email: this.email, password: this.password}).then((result) => {
          if(!result.data.error) router.push({path: "/iot"})
          else {
            this.messageError = 'Mot de passe invalide'
          }
        });
      }
    }
  }
</script>

<style src="./Login.css"/>
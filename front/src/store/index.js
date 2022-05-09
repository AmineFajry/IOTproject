import Vue from "vue";
import Vuex from "vuex";
import dataService from "@/service/dataService";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    authenticating: false,
    user: {
      email: localStorage.getItem("email") || null,
      token: localStorage.getItem("token") || null,
    },
  },
  getters: {
    authenticating(state) {
      return state.authenticating;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setAuthenticating(state, authenticating) {
      state.authenticating = authenticating;
    },
    setUser(state, { email, token}) {
      Vue.set(state.user, "email", email);
      Vue.set(state.user, "token", token);
    },
  },
  actions: {
    login({commit}, {email, password}) {
      if (!email || !password) {
        return;
      }
      commit("setAuthenticating", true);
      const promise = dataService.login({email, password});
      promise.then(user=>{
        commit("setUser", user.data);
        localStorage.setItem("email", user.data.email);
        localStorage.setItem("token", user.data.token);
      });
      return promise;
    },
    deauthenticate() {
      const email =  localStorage.getItem("email");
      return dataService.logout({email});
    }
  }
});
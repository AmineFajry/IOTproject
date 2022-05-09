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
    badges:[]
  },
  getters: {
    authenticating(state) {
      return state.authenticating;
    },
    user(state) {
      return state.user;
    },
    badges(state) {
      return state.badges;
    }
  },
  mutations: {
    setAuthenticating(state, authenticating) {
      state.authenticating = authenticating;
    },
    setUser(state, { email, token}) {
      Vue.set(state.user, "email", email);
      Vue.set(state.user, "token", token);
    },
    setBadges(state, badges) {
      console.log(badges)
      state.badges = badges
    },
    upsertBadge(state,badge){
      console.log(badge)
      const index = state.badges.findIndex(_badge => _badge.id === badge.id)
      console.log(index)
      if(index !== -1){
        console.log('ici')
        Vue.set(state.badges,index,badge)
      }
    }
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
    },
    getBadges({commit}){
      const promise = dataService.getBadges();
      promise.then(result =>{
        const badges = result.data.message
        commit('setBadges', badges)
      })
      return promise;
    },
    removeBadge(_,{id}){
      return dataService.removeBadge({id});
    },
    editBadge({commit},{badge}){
      const promise = dataService.editBadge({badge});
      promise.then(result =>{
        const badge = result.data.message
        commit('upsertBadge', badge)
      })
      return promise;
    },
    storeBadge({commit},{badge}){
      const promise = dataService.storeBadge({badge});
      promise.then(result =>{
        const badge = result.data.message
        commit('upsertBadge', badge)
      })
      return promise;
    },
    getIOTdata(){
      return dataService.getIOTData();
    },
    deleteIOTdata(_,{id}){
      return dataService.deleteIOTData({id});
    },
    postIOTData(_,{seuil,addrMac}){
      return dataService.postIOTData({seuil,addrMac});
    },
    updateLightSensor(_,{seuil,addrMac}){
      return dataService.updateLightSensor({seuil,addrMac});
    }
  }
});
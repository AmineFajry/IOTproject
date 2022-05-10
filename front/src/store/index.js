import Vue from "vue";
import Vuex from "vuex";
import dataService from "@/service/dataService";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    authenticating: localStorage.getItem("authenticating") || false,
    user: {
      email: localStorage.getItem("email") || null,
      token: localStorage.getItem("token") || null,
      id:    localStorage.getItem("id") || null,
    },
    badges:[],
    historique:[],
    microcs:[]
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
    },

    historique(state) {
      return state.historique;
    },
    microcs(state)
    {
      return state.microcs;
    }
  },
  mutations: {
    setAuthenticating(state, authenticating) {
      state.authenticating = authenticating;
    },
    setUser(state, { email, token,id}) {
      console.log(email, token,id)
      Vue.set(state.user, "email", email);
      Vue.set(state.user, "token", token);
      Vue.set(state.user, "id", id);
    },
    setBadges(state, badges) {
      state.badges = badges
    },
    setHistorique(state, historique) {
      state.historique = historique
    },
    setMicrocs(state, microcs){
      console.log(microcs)
      state.microcs = microcs
    },
    upsertBadge(state,badge){
      const index = state.badges.findIndex(_badge => _badge.id === badge.id)
      if(index !== -1){
        Vue.set(state.badges,index,badge)
      }else{
        state.badges.push(badge)
      }
    },
    upsertMicroc(state,microc){
      const index = state.microcs.findIndex(_microc => _microc.id === microc.id)
      if(index !== -1){
        Vue.set(state.microcs,index,microc)
      }else{
        state.microcs.push(microc)
      }
    },
    upsertLightSensor(state,microc){
      const index = state.microcs.findIndex(_microc => _microc.id === microc.id)
      if(index !== -1){
        Vue.set(state.microcs,index,microc)
      }else{
        state.microcs.push(microc)
      }
    },
    deleteBadge(state, {id}){
      const index = state.badges.findIndex(_badge => _badge.id === id)
      if(index !== -1){
        state.badges.splice(index,1)
      }
    },
    deleteMicorc(state, {id}){
      const index = state.microcs.findIndex(_microc => _microc.id === id)
      if(index !== -1){
        state.microcs.splice(index,1)
      }
    }
  },
  actions: {
    login({commit}, {email, password}) {
      if (!email || !password) {
        return;
      }
      commit("setAuthenticating", true);
      localStorage.setItem("authenticating", true);
      const promise = dataService.login({email, password});
      promise.then(user=>{
        commit("setUser", user.data);
        localStorage.setItem("email", user.data.email);
        localStorage.setItem("token", user.data.token);
        localStorage.setItem("id", user.data.id);
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
    removeBadge({commit},{id}){
      const promise = dataService.removeBadge({id});
      promise.then(result =>{
        if(result.data.message === 1){
          commit('deleteBadge', {id})
        }
      })
      return promise;
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
    getHistorique({commit}){
      const promise = dataService.getHistorique();
      promise.then(result =>{
        const historique = result.data.message
        commit('setHistorique', historique)
      })
      return promise;
    },
    getIOTdata({commit}){

      const promise = dataService.getIOTData();
      promise.then(result =>{
        const microcs = result.data
        commit('setMicrocs', microcs)
      })
      return promise;

    },
    deleteIOTdata({commit},{id}){
      const promise = dataService.deleteIOTData({id});

      promise.then(result =>{

        if(result.data.message === 1){

          commit('deleteMicorc', {id})
        }
      })

      return promise;
    },
    postIOTData({commit},{iot}){
      const promise = dataService.postIOTData({iot});
      promise.then(result =>{
        const microc = result.data.message
        commit('upsertMicroc', microc)
      })
      return promise;

    },
    updateLightSensor({commit},{iot}){
      console.log(iot)
      const promise =  dataService.updateLightSensor({iot});
      promise.then(result =>{
        const microc = result.data.message
        commit('upsertLightSensor', microc)
      })
      return promise;
    }
  }
});
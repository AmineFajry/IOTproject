import http from "./http-common";

class DataService {
    login({email, password}) {
        return http.post("/login", {email, password});
    }
    logout({email}){
        return http.post("/logout",{email});
    }
    getBadges(){
        return http.get('/user/listbadge')
    }
    removeBadge({id}){
        return http.delete('/user/badge',{params: {id}})
    }
    editBadge({badge}){
        return http.put('/user/badge',{badge})
    }
    storeBadge({badge}) {
        return http.post('/user/badge', {badge})
    }
    getHistorique() {
        return http.get('/user/listaccess')
    }
    getIOTData(){
        return http.get("/user/listobject");
    }
    deleteIOTData({id}){
        return http.delete("/user/listobject",{params:{id}})
    }
    postIOTData({seuil,addrMac}){
        return http.post("/user/listobject",{params:{seuil,addrMac}})
    }
    updateLightSensor({seuil,addrMac})
    {
        return http.post("/user/update/lightsensor",{params:{seuil,addrMac}})
    }
}

export default new DataService();
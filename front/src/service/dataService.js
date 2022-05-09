import http from "./http-common";

class DataService {
    login({email, password}) {
        return http.post("/login", {email, password});
    }
    logout({email}){
        return http.post("/logout",{email});
    }
}

export default new DataService();
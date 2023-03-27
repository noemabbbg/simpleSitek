import {makeAutoObservable} from "mobx";

class UserStore{
    constructor() {
        this._isAuth = false;
        this._user = 0;
        this._token = '';
        this._is_manager = false;
        makeAutoObservable(this);
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }

    setUser(user){
        this._user = user;
    }

    setToken(token){
        this._token = token;
    }

    setManager(bool){
        this._is_manager = bool;
    }

    get isAuth(){
        return this._isAuth;
    }

    get user(){
        return this._user;
    }

    get token(){
        return this._token;
    }
    
    get is_manager(){
        return this._is_manager;
    }
}

export default new UserStore();
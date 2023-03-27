import {makeAutoObservable} from "mobx";
import {useContext} from "react";

class Cart{

    constructor() {
        this.mas = [];
        makeAutoObservable(this);
    }

    make(cart){
        this.mas = cart;
    }

    add(comic){
        this.mas.push(comic);
    }

    del(id){
        this.mas = this.mas.filter(cart => cart.pk !== id);
    }

    get arr(){
        return this.mas;
    }
}

export default new Cart();
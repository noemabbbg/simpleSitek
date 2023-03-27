import {makeAutoObservable} from "mobx";

class isInCart{
    bool = false;

    constructor() {
        makeAutoObservable();
    }

    Set(){
        this.bool = true;
    }

    Reset(){
        this.bool = false;
    }

    Change(){
        this.bool = !(this.bool);
    }
}

export default new isInCart();
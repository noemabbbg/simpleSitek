import {makeAutoObservable} from "mobx";

class LibraryStore{

    mas = [];

    constructor() {
        this.mas = [];
        //makeAutoObservable(this);
    }

    make(lib){
        this.mas = lib;
    }

    add(comic){
        this.mas.push(comic);
    }

    del(id){
        this.mas = this.mas.filter(lib => lib.id !== id);
    }

    get arr(){
        return this.mas;
    }
}

export default new LibraryStore();
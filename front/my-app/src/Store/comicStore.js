import {makeAutoObservable} from "mobx";

class comicStore{

    constructor(){
        this._genres = [];
        this._developers = [];
        this._publishers = [];
        this._comics = [];
        //this._prices =[];
        makeAutoObservable(this);
    }


    setGenres(genres){
        this._genres = genres;
    }

    setPrices(genres){
        this._genres = genres;
    }
    setDevelopers(developers){
        this._genres = developers;
    }

    setPublishers(publishers){
        this._genres = publishers;
    }

    setComics(comics){
        this._genres = comics;
    }

    get genres(){
        return this._genres;
    }

    get developers(){
        return this._developers;
    }

    get publishers(){
        return this._publishers;
    }

    get _prices(){
        return this._prices
    }
    get comics(){
        return this._comics;
    }
}

export default new comicStore();
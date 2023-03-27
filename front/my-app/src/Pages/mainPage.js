import React, {useContext, useEffect, useState} from "react";
import AuthService, {getCart, getComicByName, getComicPriceByID, getGenres, getLib, getComicByPrice,getComicByGenre} from "../components/requests";
import {Col, Container, Row} from "react-bootstrap";
import InputField from "../components/inputField";
import {ComicCard} from "../components/comicCard";
import comicStore from "../Store/comicStore";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import '../components/styles.css'
const MainPage = observer (() => {

    const {user} = useContext(Context);
    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const [searchComic, setSearchComic] = useState('');
   // const [setComicsPrice] = useState('');

    const [comicsGens, setComicsGens] = useState([]);
    const [setComicsPrice] = useState([]);
    const [fullComics, setFullComics] = useState([]);

    const [loading, setLoading] = useState(false);
    /*useEffect( async () => {
        cart.make(await getCart(user.user));
        lib.make(await getLib(user.user));
        setLoading(true);
        const results = await getComicByName(searchComic);
        //setComicsPrice(results);
        setComicsGens(results);
        setFullComics(results);
        // Убираем загрузку
        comicStore.setComics(comicsGens);
        setLoading(false);
    }, []);  */
    const handleSearchComic = async () =>{
        
        cart.make(await getCart(user.user));
        lib.make(await getLib(user.user));
        setLoading(true);
        const results = await getComicByName(searchComic);
        console.log('sghdrdgr',getComicByName(searchComic));
        setComicsGens(results);
        //setComicsPrice(results);
        console.log(setComicsGens(results))
        setFullComics(results);
        // Убираем загрузку
        comicStore.setComics(comicsGens);
        setLoading(false);
    }

    async function handleSearchGen () {
        const searchGen = document.getElementById('genres').value;
        //console.log(Boolean(searchGen));
        //console.log(setComicsGens(fullComics.filter(elem => elem.genre.toLowerCase().includes(searchGen.toLowerCase()))));
        //console.log('sghdrdgr',getComicByName(searchComic).filter(elem =>));
        if(searchGen)
            setComicsGens(await getComicByGenre(searchGen));
        else
            setComicsGens(fullComics);
        //console.log((fullComics.filter(elem => elem.genre.toLowerCase().includes(searchGen.toLowerCase()))));
    }
    async function handleSearchPrice () {
        const searchPrice = document.getElementById('price').value;
        //const fullComics = getComicByPrice(searchPrice);
        //console.log('funccc', await getComicByPrice(searchPrice))
        //console.log((searchPrice));
        //console.log(fullComics[1]);
        //console.log('1gtdhf', fullComics.filter(elem => elem.price <= searchPrice));
        //console.log(setComicsGens(fullComics.filter(elem => elem.genre.toLowerCase().includes(searchPrice.toLowerCase()))));
        if(searchPrice)
            setComicsGens(await getComicByPrice(searchPrice));
        else
            setComicsGens(fullComics);
        
    }

    useEffect(() =>{
        user.setUser(parseInt(localStorage.getItem('user_id')));
        user.setManager(localStorage.getItem('is_man'));
    }, [])

    return (
        
        <div> 
            
                
            
            <InputField className='btns' value={searchComic} placeholder='Название' setValue={setSearchComic} loading={loading} onSubmit={handleSearchComic} buttonTitle={'Искать'}/>
            <input className="inputfield" id='genres' placeholder='Жанр' onChange={handleSearchGen}/>
            <input className="inputfield" id='price' placeholder='Цена до:' onChange={handleSearchPrice}/>
            {!comicsGens.length ? <h1 key = 'outh1'></h1>:
                <Row>
                    {comicsGens.map((comic) => {
                        return (
                            <ComicCard comic = {comic.name} genre = {comic.genre} price = {comic.price} object={comic}/>
                        );
                    })}
                </Row>
            }
        </div>
    );
})

export default MainPage;
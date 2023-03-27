import React, {useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {getCart, getComicByIDManager, getLib} from "../components/requests";
import {observer} from "mobx-react-lite";
import CartCard from "./CartCard";
import {Context} from "../index";
import LibCard from "./LibCard";
import '../components/styles.css'
const Cart = observer(() => {

    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const [cartS, setCart] = useState([]);
    const [libS, setLib] = useState([]);
    const [comics, setComics] = useState([]);
    const [comicsLib, setComicsLib] = useState([]);

    const [loading, setLoading] = useState(false);

    const [cartOrLib, setCartOrLib] = useState(false);

    const userID = localStorage.getItem('user');

    let Comics = [];

    const makeCart = async () => {
        await setLoading(true);
        setComicsLib([]);
        setCartOrLib(false);
        const results = await getCart(userID);
        setCart(results);
        console.log(results)
        cart.make(results);
        await setLoading(false);
    }

    const makeLib = async () => {
        await setLoading(true);
        setComics([]);
        setCartOrLib(true);
        const results = await getLib(userID);
        setLib(results);
        lib.make(results);
        for(let i = 0; i < lib.mas.length; ++i){
            let elem = await getComicByIDManager(lib.mas[i].comic_id);
            elem.lib_id = lib.mas[i].id;
            Comics.push(elem);
        }
        setComicsLib(Comics);
        await setLoading(false);
    }

    useEffect( () => {
        const get = async () =>{
            let Comics = [];
            for(let i = 0; i < cartS.length; ++i){
                let elem = await getComicByIDManager(cartS[i].comic_id);
                elem.cart_id = cartS[i].pk;
                elem.add_date = cartS[i].add_date
                Comics.push(elem);
            }
            setComics(Comics);
        }
        get();
    }, [cartS])

    useEffect( () => {
        console.log('comics', comics);
    }, [comics])
    
    return (
        <div>
        {/* <Button onClick={makeLib} disabled={loading}>Библиотека</Button> */}
            <Button className='Cartbtn' onClick={makeCart} disabled={loading}>Подписка</Button>
            
            {!cartOrLib ? (!comics.length ? <div></div>:
                <div>
                    {comics.map((comic) => {
                        return(
                            <div key ={comic.id}>
                                <CartCard name = {comic.name} cart_id = {comic.cart_id} comic_id = {comic.id} price={comic.price} add_date = {comic.add_date}/>
                            </div>
                        )
                    })
                    }
                </div>) :
                (!comicsLib.length ? <div></div>:
                <div>
                    {comicsLib.map((comic) => {
                        return(
                            <div key ={comic.id}>
                                <LibCard name = {comic.name} lib_id = {comic.lib_id} object={comic} library={lib.mas}/>
                            </div>
                        )
                    })
                    }
                </div>)
            }
        </div>
    );
})

export default Cart;
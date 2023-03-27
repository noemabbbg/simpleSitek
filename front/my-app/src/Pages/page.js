import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router";
import {CartService, getCart, getComicByID} from "../components/requests";
import {Context} from "../index";
import gazeta from "./gazeta.png"
const comicPage = observer(() => {

    const params = useParams();

    const [comic, setComic] = useState({});

    const [isInCart, setIsInCart] = useState(false);
    const [isInLib, setIsInLib] = useState(false);

    const [loading, setLoading] = useState(false);

    const {user} = useContext(Context);
    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const isAuth = user.isAuth;
    const userID = user.user;

    const comicID = params.id;

    const getComic = async () => {
        return await getComicByID(comicID);
    }

    getComic();

    let ind = [];
    cart.arr.map(elem => ind.push(elem.comic_id));

    let indLib = [];
    lib.arr.map(elem => indLib.push(elem.comic_id));

    let pk = 0;

    const addToCart = async () =>{
        setLoading(true);
        await CartService.addToCart(userID, comicID);
        cart.add(comic);
        setIsInCart(true);
        setLoading(false);
    }

    const delFromCart = async () =>{
        setLoading(true);

        for(let i = 0; i < cart.arr.length; ++i)
            if(comic.id === cart.arr[i].comic_id)
                pk = cart.arr[i].pk;

        await CartService.delFromCart(pk);
        cart.del(pk);
        setIsInCart(false);
        setLoading(false);
    }

    useEffect(() =>{
        getComic().then(data => setComic(data));
    }, [])

    useEffect(() => {

        getCart(userID).then(data => cart.make(data));

        for(let i = 0; i < cart.arr.length; ++i)
            if(comic.id === cart.arr[i].comic_id)
                pk = cart.arr[i].pk;

        let pkLib = 0;
        for(let i = 0; i < lib.arr.length; ++i)
            if(comic.id === lib.arr[i].comic_id)
                pkLib = lib.arr[i].pk;

        setIsInCart(ind.indexOf(comic.id) !== -1);
        setIsInLib(indLib.indexOf(comic.id) !== -1);
    }, [comic])

    return (
        <Container
            className='d-flex justify-content-center align-self-center'
        >
            <Card style={{width: 400}} className='p-5' key={comic.id}>
                <Card.Header>{comic.name}</Card.Header>
                <Card.Body>
                    <div>Газета Известия </div>
                    <imgs src={gazeta}/>
                    <div>{comic.developer} </div>
                    <div>{comic.publisher} </div>
                    <div>{comic.releasedate} </div>
                </Card.Body>
                <Card.Footer>
                    {isAuth ?
                        (isInLib ?
                                (<Button variant='success' disabled={loading}> В библиотеке </Button>)
                                :
                                !isInCart ? (<Button onClick={addToCart} disabled={loading}> Подписаться </Button>)
                                    :
                                    (<Button variant='warning' onClick={delFromCart} disabled={loading}> Удалить из подписки </Button>)
                        )
                        : <div></div>
                    }
                </Card.Footer>
            </Card>
        </Container>
    );
});

export default comicPage;
import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {addComic, getComicsByMan} from "../components/requests";
import {Context} from "../index";
import Calendar from "react-calendar";
import {ComicCard} from "../components/comicCard";
import {retry} from "@reduxjs/toolkit/query";
import {useHistory} from "react-router";
import {COMIC_MAN_ROUTE} from "../utils/routes";
import '../components/styles.css'
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const ManagerPage = () => {

    const {user} = useContext(Context);

    const [name, setName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [deleted, setDeleted] = useState(false);

    const [label, setLabel] = useState('Добавлено')

    const [comics, setComics] = useState([]);

    const history = useHistory();

    const addComicButton = async () => {
        if(isNumeric(price))
            addComic(name, developer, publisher, releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate(), price, genre, user.user, deleted)
                .catch(() => alert('Ошибка'));
        else
            alert('Цена должна быть числом');
    }

    let res = [];

    const getComics = async () => {
        res = await getComicsByMan(user.user);
        setComics(res);
        //setComics(await getComicsByMan(user.user));
    }

    function delUpdate() {
        setDeleted(!deleted);
        if(deleted){
            setLabel('Добавлено');
        }
        else{
            setLabel('Удалено');
        }
    }

    

    return (
        <Container
            className='d-flex justify-content-start align-items-top'
        >
            <Col>
            <Card style={{width: 400}} className='p-5'>
                <h2>{'Добавление'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите название'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                   
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите издателя'
                        value={publisher}
                        onChange={e => setPublisher(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите жанры'
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите цену'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control
                        disabled={true}
                        className='mt-2'
                        placeholder='Дата'
                        value={releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate()}
                    />
                    <Form.Check
                        className='mt-1'
                        type="switch"
                        id="custom-switch"
                        label={label}
                        onChange={delUpdate}
                    />
                    <Calendar value={releaseDate} onChange={setReleaseDate}></Calendar>
                    <Button className='mt-3' variant='outline-success' onClick={addComicButton}>
                        Добавить
                    </Button>
                </Form>
            </Card>
            </Col>
            <Col>
                <div>
                    <Button className='Btns' onClick={getComics}>Показать</Button>
                    {comics.map((comic) => {
                        return(
                            <Card onClick={() => history.push(COMIC_MAN_ROUTE + '/' + comic.id)}>
                                <Card.Text>{comic.name}</Card.Text>
                            </Card>
                        )
                    })}
                </div>
            </Col>
        </Container>
    );
};

export default ManagerPage;
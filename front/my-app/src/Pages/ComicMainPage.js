import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router";
import {Button, Card, Container, Form} from "react-bootstrap";
import Calendar from "react-calendar";
import {chgComic, getComicByIDManager} from "../components/requests";
import {Context} from "../index";
import {MANAGER_ROUTE} from "../utils/routes";

const ComicManPage = () => {

    const {id} = useParams();

    const {user} = useContext(Context);

    const history = useHistory();

    let comic = {};

    const [name, setName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [deleted, setDeleted] = useState(false);

    const [label, setLabel] = useState('Добавлено')

    const chgComicButton = async () => {
        comic['id'] = id;
        comic['name'] = name;
        comic['genre'] = genre;
        comic['releasedate'] = releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate();
        comic['developer'] = developer;
        comic['publisher'] = publisher;
        comic['price'] = price;
        comic['managed_by'] = user.user;
        await chgComic(comic.id, comic.name, comic.developer, comic.publisher, comic.releasedate, comic.price, comic.genre, user.user, deleted);
        //await chgComic(comic);
        history.push(MANAGER_ROUTE);
    }

    useEffect(() => {
        let ignore = false;
        if(!ignore) {
            getComicByIDManager(id).then((res) => {
                setName(res.name);
                setDeveloper(res.developer);
                setPublisher(res.publisher);
                const date = res.releasedate.split('-');
                setReleaseDate(new Date(date[0], date[1], date[2]))
                setPrice(res.price);
                setGenre(res.genre);
                setDeleted(res.is_deleted);
                console.log(res.is_deleted);
            });
        }
        return(() => ignore = true);
    }, [])

    function delUpdate() {
        setDeleted(!deleted);
    }

    useEffect(() => {
        console.log(deleted);
        if(!deleted){
            setLabel('Добавлено');
        }
        else{
            setLabel('Удалено');
        }
    }, [deleted])

    return (
        <Container
            className='d-flex justify-content-start align-items-top'
        >
                <Card style={{width: 400}} className='p-5'>
                    <h2>Изменение</h2>
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
                        <Button className='mt-3' variant='outline-success' onClick={chgComicButton}>
                            Изменить
                        </Button>
                    </Form>
                </Card>
        </Container>
    );
};

export default ComicManPage;
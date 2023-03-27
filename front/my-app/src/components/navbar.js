import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UserStore from '../Store/auth';
import {useHistory} from "react-router";
import {CART_ROUTE, MAIN_PAGE_ROUTE, MANAGER_ROUTE} from "../utils/routes";
import AuthService from "./requests";
import './styles.css'
import Breadcrumb from './Breadcrumb';
const NavBar = observer (() => {

    const history = useHistory();

    const {user} = useContext(Context);

    const cart = [];

    const logOut = () => {
        UserStore.setToken('');
        UserStore.setIsAuth(false);
        localStorage.setItem('token', '');
        localStorage.setItem('user_id', '');
        localStorage.setItem('is_man', '');
        AuthService.logOut();
    }

    return (
        <Navbar  className='header'>
            <Container>
                <Navbar.Brand  onClick={() => history.push(MAIN_PAGE_ROUTE)}>Главная</Navbar.Brand>
                { <p className="bread">Вы находитесь на странице: <Breadcrumb /></p> }
                
                {!user.isAuth ?
                <Nav  style={{color: 'white'}}>
                    <Button className='Btns' variant="primary" href='/авторизация'>Войти</Button>
                </Nav>
                    :
                <Nav>
                    {localStorage.getItem('is_man') === 'true' ?
                        <Button className='Btns'  onClick={() => history.push(MANAGER_ROUTE)}>админ</Button>
                        :
                        <div></div>}
                        <Button className='Btns'  onClick={() => history.push(CART_ROUTE)}>{"Аккаунт"}</Button>
                        <Button className='Btns' onClick={logOut}>Выйти</Button>
                </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
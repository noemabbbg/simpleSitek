import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppRouter from "../components/appRouter";
import NavBar from "../components/navbar";
import '../css/App.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import AuthService from "../components/requests";
import {Spinner} from "react-bootstrap";
import jwtDecode from "jwt-decode";
//Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных
//уровнях
//Контекст разработан для передачи данных, которые можно назвать «глобальными»
// для всего дерева React-компонентов (например, текущий аутентифицированный пользователь, UI-тема или выбранный язык).
const App = observer (() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token !== '')
            AuthService.verify(localStorage.getItem('token')).then(() => {
                user.setIsAuth(true);
                const isMan = String(jwtDecode(localStorage.getItem('token')).is_manager);
                user.setManager(isMan === 'true');
        }).catch(() => {
            user.setIsAuth(false);
            localStorage.setItem('token', '');
            })
                .finally(() => setLoading(false))
    })

    if(loading){
        return (
            <Spinner animation={"grow"}/>
        )
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter />
        </BrowserRouter>
    );
})

export default App;

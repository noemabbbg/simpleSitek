import React, {useContext} from 'react';
import {Switch, Route} from "react-router-dom";
import {publicRoutes, authRoutes, managerRoutes} from "../routes";
import {Redirect} from "react-router";
import MainPage from "../Pages/mainPage";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getLib} from "./requests";

const AppRouter = observer (() => {

    const {user} = useContext(Context);
    const {lib} = useContext(Context);

    if(localStorage.getItem('user')) {
        getLib(localStorage.getItem('user')).then(res => {
            lib.make(res)
        })
    }

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )}
            {user.is_manager && managerRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )}
            <Redirect to={MainPage}/>
        </Switch>
    );
})

export default AppRouter;

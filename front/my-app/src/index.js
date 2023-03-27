import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import UserStore from './Store/auth'
import ComicStore from "./Store/comicStore";
import CartStore from "./Store/cartStore";
import LibraryStore from "./Store/LibraryStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: UserStore,
        comics: ComicStore,
        cart: CartStore,
        lib: LibraryStore
    }}>
        <App />
    </Context.Provider>
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

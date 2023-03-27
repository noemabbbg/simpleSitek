import MainPage from "./Pages/mainPage";
import {
    MAIN_PAGE_ROUTE,
    COMIC_ROUTE,
    CART_ROUTE,
    REGISTRATION_ROUTE,
    AUTH_ROUTE,
    MANAGER_ROUTE,
    COMIC_MAN_ROUTE
} from "./utils/routes";
import comicPage from "./Pages/page";
import cart from "./Pages/cart";
import Auth from "./Pages/auth";
import ManagerPage from "./Pages/managerPage";
import Registration from "./Pages/registration";
import ComicManPage from "./Pages/ComicMainPage";

export const publicRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    {
        path: COMIC_ROUTE + '/:id',
        Component: comicPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]

export const authRoutes = [
    {
        path: CART_ROUTE,
        Component: cart
    }
]

export const managerRoutes = [
    {
        path: MANAGER_ROUTE,
        Component: ManagerPage
    },
    {
        path: COMIC_MAN_ROUTE + '/:id',
        Component: ComicManPage
    }
]
import React from "react";
import './styles.css'
import {CART_ROUTE, MAIN_PAGE_ROUTE, MANAGER_ROUTE} from "../utils/routes";
import {
    Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
} from "@mui/material";
import { useHistory, useLocation } from "react-router";

const Breadcrumbs = (props) => {
    const location  = useLocation();
    const navigate = useHistory();

    const { pathname } = location;
    // arr.filter(el => el) removes anything undefined
    // from an array (such as an empty string etc)
    const pathnames = pathname.split("/").filter((el) => el);
    console.log(pathnames); //test
    const goHome = () => {
        navigate.push(MAIN_PAGE_ROUTE)
    };
    const goNav = () => {
        navigate('/')
    }

    return (
        <MUIBreadcrumbs aria-label="breadcrumb">
            <Link
                style={{ cursor: "pointer" }}
                color="primary"
                onClick={goHome}
            >
                Главная
            </Link>
            {pathnames.map((pathname, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                // To make sure the last breadcrumb is not a link
                const isLast = index === pathnames.length - 1;
                console.log("*******");
                console.log(pathname);
                console.log(routeTo);
                console.log("*******");
                return isLast ? (
                    <Typography>{pathname}</Typography>
                ) : (
                    <Link key={index}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                              navigate(routeTo)
                          }} >
                        {pathname}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;

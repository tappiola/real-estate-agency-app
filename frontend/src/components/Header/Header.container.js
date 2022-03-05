import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AdType} from "../../constants";
import './Header.style.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {logoutUser} from "../../redux/User";
import Header from "./Header.component";

const HeaderContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthorized } = useAppSelector(({ user }) => user);

    const onLoginClick = () => {
        navigate('/login');
    }

    const onLogoutClick = () => {
        dispatch(logoutUser());
    }
    const onWishlistIconClick = () => {
        navigate('/favorites');
    }

    return <Header
        onLogoutClick={onLogoutClick}
        onLoginClick={onLoginClick}
        isAuthorized={isAuthorized}
        isRentSearch={pathname === '/' + AdType.Rent}
        isSaleSearch={pathname === '/' + AdType.Sale}
        onWishlistIconClick={onWishlistIconClick}
    />;
}

export default HeaderContainer;

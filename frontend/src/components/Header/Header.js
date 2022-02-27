import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AdType} from "../../constants";
import AdvancedSearchForm from "../AdvancedSearchForm/AdvancedSearchForm";
import './Header.style.scss';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {logoutUser} from "../../redux/User";

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthorized } = useAppSelector(({ user }) => user);

    const renderChildren = () => {
        if (pathname === '/' + AdType.Rent)
            return <AdvancedSearchForm searchType={AdType.Rent}/>;

        if (pathname === '/' + AdType.Sale)
            return <AdvancedSearchForm searchType={AdType.Sale}/>;

        return null;
    }

    const onLoginClick = () => {
        navigate('/login');
    }

    const onLogoutClick = () => {
        dispatch(logoutUser());
    }

    const renderLogin = () => {
        return <button className='AuthButton' onClick={onLoginClick}>Login</button>
    }

    const renderLogout = () => {
        return <button className='AuthButton' onClick={onLogoutClick}>Logout</button>
    }

    return <header className="Header">
        {renderChildren()}
        {isAuthorized ? renderLogout() : renderLogin()}
    </header>;
}

export default Header;

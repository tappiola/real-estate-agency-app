import React from "react";
import {useLocation} from "react-router-dom";
import {AdType} from "../../constants";
import SearchForm from "./SearchForm/SearchForm";
import './Header.style.scss';

const Header = () => {
    const { pathname } = useLocation();
    console.log(pathname);

    const renderChildren = () => {
        if (pathname === '/' + AdType.Rent)
            return <SearchForm searchType={AdType.Rent}/>;

        if (pathname === '/' + AdType.Sale)
            return <SearchForm searchType={AdType.Sale}/>;

        return null;
    }


    return <header className="Header">
        {renderChildren()}
    </header>;
}

export default Header;

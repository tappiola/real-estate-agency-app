import React from "react";
import {useLocation} from "react-router-dom";
import {AdType} from "../../constants";
import AdvancedSearchForm from "../AdvancedSearchForm/AdvancedSearchForm";
import './Header.style.scss';

const Header = () => {
    const { pathname } = useLocation();
    console.log(pathname);

    const renderChildren = () => {
        if (pathname === '/' + AdType.Rent)
            return <AdvancedSearchForm searchType={AdType.Rent}/>;

        if (pathname === '/' + AdType.Sale)
            return <AdvancedSearchForm searchType={AdType.Sale}/>;

        return null;
    }


    return <header className="Header">
        {renderChildren()}
    </header>;
}

export default Header;

import React from "react";
import {AdType} from "../../constants";
import AdvancedSearchFormComponent from "../AdvancedSearchForm";
import './Header.style.scss';

const HeaderComponent = ({onLogoutClick, onLoginClick, isRentSearch, isSaleSearch, isAuthorized}) => {
    const renderChildren = () => {
        if (isRentSearch)
            return <AdvancedSearchFormComponent searchType={AdType.Rent}/>;

        if (isSaleSearch)
            return <AdvancedSearchFormComponent searchType={AdType.Sale}/>;

        return null;
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

export default HeaderComponent;

import React from "react";
import {AdType} from "../../constants";
import AdvancedSearchFormComponent from "../AdvancedSearchForm";
import './Header.style.scss';
import WishlistIcon from "../WishlistIcon";

const HeaderComponent = ({onLogoutClick, onLoginClick, isRentSearch, isSaleSearch, isAuthorized, onWishlistIconClick}) => {
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
        <div className="Actions">
            <div className="WishlistIcon-Container" onClick={onWishlistIconClick}>
            <WishlistIcon isActive={true}/>
            </div>
            {isAuthorized ? renderLogout() : renderLogin()}
        </div>
    </header>;
}

export default HeaderComponent;

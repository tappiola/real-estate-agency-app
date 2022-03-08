import React from "react";
import {AdType} from "../../constants";
import AdvancedSearchForm from "../AdvancedSearchForm";
import './Header.style.scss';
import WishlistIcon from "../WishlistIcon";
import Curtain from "../Curtain";
import FilterIcon from "../FilterIcon";

const HeaderComponent: React.FC<{
    onLogoutClick: () => void,
    onLoginClick: () => void,
    searchType: AdType | null,
    isAuthorized: boolean,
    isMobile: boolean
    onWishlistIconClick: () => void,
    isCurtainActive: boolean,
    setIsCurtainActive: (status: boolean) => void
}> = ({onLogoutClick, onLoginClick, searchType, isAuthorized, onWishlistIconClick, isMobile, isCurtainActive, setIsCurtainActive}) => {
    const renderChildren = () => {
        if (!searchType || (isMobile && isCurtainActive)) {
            return null;
        }

        if (isMobile){
            return <div onClick={() => setIsCurtainActive(true)}><FilterIcon/></div>;
        }

        return <AdvancedSearchForm searchType={searchType}/>;
    }

    const renderLogin = () => {
        return <button className='AuthButton' onClick={onLoginClick}>Login</button>
    }

    const renderLogout = () => {
        return <button className='AuthButton' onClick={onLogoutClick}>Logout</button>
    }

    return <><header className="Header">
        {renderChildren()}
        <div className="Actions">
            <div className="WishlistIcon-Container" onClick={onWishlistIconClick}>
            <WishlistIcon isActive={true}/>
            </div>
            {isAuthorized ? renderLogout() : renderLogin()}
        </div>
    </header>
        {isMobile && searchType && <Curtain searchType={searchType} isCurtainActive={isCurtainActive} setIsCurtainActive={setIsCurtainActive}/>}
        </>
}

export default HeaderComponent;

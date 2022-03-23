import React from 'react';
import { Link } from 'react-router-dom';
import { AdType, Path } from '../../constants';
import AdvancedSearchForm from '../AdvancedSearchForm';
import './Header.style.scss';
import WishlistIcon from '../WishlistIcon';
import Curtain from '../Curtain';
import FilterIcon from '../FilterIcon';
import logo from './logo.png';

const HeaderComponent: React.FC<{
    onLogoutClick: () => void,
    onLoginClick: () => void,
    searchType: AdType | null,
    isAuthorized: boolean,
    isMobile: boolean
    onWishlistIconClick: () => void,
    isCurtainActive: boolean,
    setIsCurtainActive: (status: boolean) => void
}> = ({
    onLogoutClick,
    onLoginClick,
    searchType,
    isAuthorized,
    onWishlistIconClick,
    isMobile,
    isCurtainActive,
    setIsCurtainActive
}) => {
    const renderChildren = () => {
        if (!searchType || (isMobile && isCurtainActive)) {
            return null;
        }

        if (isMobile) {
            return (
              <div
                className="Header-Filter"
                role="menu"
                tabIndex={0}
                onClick={() => setIsCurtainActive(true)}
              >
                <FilterIcon />
              </div>
            );
        }

        return <AdvancedSearchForm searchType={searchType} />;
    };

    const renderLogin = () => <button type="button" className="AuthButton" onClick={onLoginClick}>Login</button>;

    const renderLogout = () => <button type="button" className="AuthButton" onClick={onLogoutClick}>Logout</button>;

    return (
      <>
        <header className="Header">
          <Link className="Header-HomeLink" to={Path.HomePage}>
            <img className="Header-Logo" src={logo} alt="company-logo" />
            <p className="Header-LogoTitle">Tappiola estate</p>
          </Link>
          {renderChildren()}
          <div className="Actions">
            <div
              role="link"
              tabIndex={0}
              className="WishlistIcon-Container"
              onClick={onWishlistIconClick}
            >
              <WishlistIcon isActive />
            </div>
            {isAuthorized ? renderLogout() : renderLogin()}
          </div>
        </header>
        {isMobile && searchType && (
        <Curtain
          searchType={searchType}
          isCurtainActive={isCurtainActive}
          setIsCurtainActive={setIsCurtainActive}
        />
        )}
      </>
    );
};

export default HeaderComponent;

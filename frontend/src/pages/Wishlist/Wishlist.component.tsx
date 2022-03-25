import React from 'react';
import clsx from 'clsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import WishlistCard from '../../components/WishlistCard';
import { Property } from '../../types';
import './Wishlist.style.scss';
import { AdType } from '../../constants';
import GenericMessage from '../../components/GenericMessage';
import WishlistLoader from '../../components/WishlistLoader';

const Wishlist: React.FC<{
    properties: Property[],
    isAuthorized: boolean,
    hasError: boolean,
    adType: AdType,
    setAdType: (type: AdType) => void,
    isLoading: boolean
}> = ({
    properties,
    isAuthorized,
    hasError,
    adType,
    setAdType,
    isLoading
}) => {
    if (!isAuthorized) {
        return <GenericMessage>Please, login to work with wishlist</GenericMessage>;
    }

    if (hasError) {
        return <GenericMessage>Wishlist fetching failed</GenericMessage>;
    }

    const renderHeader = () => (
      <div className="Wishlist-Header">
        <h1 className="Wishlist-Title">
          Saved Properties
          {properties.length && <small>{` (${properties.length})`}</small>}
        </h1>
        <div className="Wishlist-Buttons">
          <button
            className={clsx('Wishlist-ToggleLeft', adType === AdType.Sale && 'Wishlist-ToggleActive')}
            type="button"
            onClick={() => setAdType(AdType.Sale)}
          >
            For sale
          </button>
          <button
            className={clsx('Wishlist-ToggleRight', adType === AdType.Rent && 'Wishlist-ToggleActive')}
            type="button"
            onClick={() => setAdType(AdType.Rent)}
          >
            To rent
          </button>
        </div>
      </div>
    );

    const renderProperty = (property: Property) => (
      <CSSTransition key={property.id} timeout={400} classNames="fade">
        <WishlistCard property={property} />
      </CSSTransition>
    );

    const renderProperties = () => {
        if (isLoading) {
            return <WishlistLoader />;
        }

        if (!properties.length) {
            return <GenericMessage>No saved properties</GenericMessage>;
        }

        return (
          <TransitionGroup className="Wishlist-Properties">
            {properties.map((property: Property) => renderProperty(property))}
          </TransitionGroup>
        );
    };

    return (
      <>
        {renderHeader()}
        {renderProperties()}
      </>
    );
};

export default Wishlist;

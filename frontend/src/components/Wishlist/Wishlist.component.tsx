import React from 'react';
import clsx from 'clsx';
import WishlistCard from '../WishlistCard';
import { Property } from '../../types';
import './Wishlist.style.scss';
import { AdType } from '../../constants';
import GenericMessage from '../GenericMessage';

const Wishlist: React.FC<{
    properties: Property[],
    isAuthorized: boolean,
    hasError: boolean,
    adType: AdType,
    setAdType: (type: AdType) => void
}> = ({
    properties,
    isAuthorized,
    hasError,
    adType,
    setAdType
}) => {
    if (!isAuthorized) {
        return <GenericMessage>Please, login to work with wishlist</GenericMessage>;
    }

    if (hasError) {
        return <h4>Wishlist fetching failed...</h4>;
    }

    const renderHeader = () => (
      <div className="Wishlist-Header">
        <h1 className="Wishlist-Title">Saved Properties</h1>
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

    const renderProperties = () => {
        if (!properties.length) {
            return <h4 className="Wishlist-Empty">No saved properties</h4>;
        }

        return (
          <div className="Wishlist-Properties">
            {properties.map((p: Property) => <WishlistCard key={p.id} property={p} />)}
          </div>
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

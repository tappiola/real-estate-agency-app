import React from 'react';
import WishlistCard from '../WishlistCard';
import { Property } from '../../types';
import './Wishlist.style.scss';

const Wishlist: React.FC<{
    properties: Property[],
    isAuthorized: boolean,
    hasError: boolean,
}> = ({ properties, isAuthorized, hasError }) => {
    if (!isAuthorized) {
        return <h4 className="Wishlist-NotAuthorized">Please, login to work with wishlist</h4>;
    }

    if (hasError) {
        return <h4>Wishlist fetching failed...</h4>;
    }

    if (!properties.length) {
        return <h4>Wishlist is Empty</h4>;
    }

    return (
      <>
        <h1>Saved Properties</h1>
        <div className="Wishlist-Properties">
          {properties.map((p: Property) => <WishlistCard key={p.id} property={p} />)}
        </div>
      </>
    );
};

export default Wishlist;

import React from 'react';
import WishlistCard from '../WishlistCard';
import { Property } from '../../types';

const Wishlist: React.FC<{
    properties: Property[],
    isAuthorized: boolean,
    hasError: boolean,
}> = ({ properties, isAuthorized, hasError }) => {
    if (!isAuthorized) {
        return <h4>Please, login to work with wishlist</h4>;
    }

    if (hasError) {
        return <h4>Wishlist fetching failed...</h4>;
    }

    if (!properties.length) {
        return <h4>Wishlist is Empty</h4>;
    }

    return (
      <>
        <h1>Wishlist</h1>
        {properties.map((p: Property) => <WishlistCard key={p.id} property={p} />)}
      </>
    );
};

export default Wishlist;

import WishlistIcon from "../WishlistIcon";
import {PropertyType} from '../types';
import React from "react";

const Property: React.FC<{property: PropertyType, isInWishlist: boolean, onWishlistToggle: () => void}> = ({property, isInWishlist, onWishlistToggle}) => {
    return (
        <div>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.city.name}</p>
            <p>{property.propertyType?.name}</p>
            <p onClick={onWishlistToggle}>
                <WishlistIcon isActive={isInWishlist}/>
            </p>
            <p>{isInWishlist ? 'IN WISHLIST': 'NOT IN WISHLIST' }</p>
        </div>
    );
}

export default Property;
import {PropertyType} from '../../types';
import React from "react";
import ToggleWishlist from "../ToggleWishlist";

const Property: React.FC<{property: PropertyType, isInWishlist: boolean}> = ({property, isInWishlist}) => {
    return (
        <div>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.city.name}</p>
            <p>{property.propertyType?.name}</p>
            <ToggleWishlist property={property} inWishlist={isInWishlist}/>
        </div>
    );
}

export default Property;
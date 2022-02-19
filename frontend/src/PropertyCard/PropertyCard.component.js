import React from "react";
import ToggleWishlist from "../ToggleWishlist";

const PropertyCardComponent = ({property}) => {
    return (
        <div>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.city.name}</p>
            <p>{property.propertyType?.name}</p>
            <ToggleWishlist property={property} inWishlist={property.isInWishlist}/>
        </div>
    );
}

export default PropertyCardComponent;
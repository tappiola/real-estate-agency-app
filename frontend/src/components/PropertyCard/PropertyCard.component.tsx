import React from "react";
import ToggleWishlist from "../ToggleWishlist";
import './PropertyCard.style.scss';
import {PropertyType} from "../../types";

const PropertyCardComponent: React.FC<{property: PropertyType, loadProperty: () => void}> = ({property, loadProperty}) => {
    return (
            <div className="PropertyCard" onClick={loadProperty}>
                <h2>{property.title}</h2>
                <p>{property.description}</p>
                <p>{property.city.name}</p>
                <p>{property.propertyType?.name}</p>
                <ToggleWishlist property={property} inWishlist={property.isInWishlist}/>
            </div>
    );
}

export default PropertyCardComponent;
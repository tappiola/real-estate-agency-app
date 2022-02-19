import {useNavigate} from "react-router-dom";
import PropertyCard from "./PropertyCard.component";
import {PropertyType} from "../../types";
import React from "react";

const PropertyCardContainer: React.FC<{property: PropertyType}> = ({property}) => {
    let navigate = useNavigate();

    const loadProperty = () => {
        console.log('save page position');
        navigate(`/property/${property.id}`);
    }

    return <PropertyCard property={property} loadProperty={loadProperty}/>
}

export default PropertyCardContainer;
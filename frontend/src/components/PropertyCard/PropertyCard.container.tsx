import {useNavigate} from "react-router-dom";
import PropertyCard from "./PropertyCard.component";
import {PropertyType} from "../../types";
import React from "react";
import {useDispatch} from 'react-redux';
import {saveScrollPosition} from "../../store/Navigation/actions";

const PropertyCardContainer: React.FC<{property: PropertyType}> = ({property}) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const loadProperty = () => {
        console.log('save page position');
        dispatch(saveScrollPosition(window.scrollY));
        navigate(`/property/${property.id}`);
    }

    return <PropertyCard property={property} loadProperty={loadProperty}/>
}

export default PropertyCardContainer;
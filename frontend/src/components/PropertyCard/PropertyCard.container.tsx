import {useNavigate} from "react-router-dom";
import PropertyCard from "./PropertyCard.component";
import {PropertyType} from "../../types";
import React from "react";
import {saveScrollPosition} from "../../redux/Navigation";
import {useAppDispatch} from "../../redux/store";

const PropertyCardContainer: React.FC<{property: PropertyType}> = ({property}) => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const loadProperty = () => {
        dispatch(saveScrollPosition(window.scrollY));
        navigate(`/property/${property.id}`);
    }

    return <PropertyCard property={property} loadProperty={loadProperty}/>
}

export default PropertyCardContainer;
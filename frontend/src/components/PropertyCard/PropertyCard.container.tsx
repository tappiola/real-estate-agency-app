import {useNavigate} from "react-router-dom";
import PropertyCard from "./PropertyCard.component";
import {PropertyType} from "../../types";
import React from "react";
import {saveScrollPosition} from "../../redux/Navigation";
import {useAppDispatch} from "../../redux/hooks";

const PropertyCardContainer: React.FC<{property: PropertyType, index: number}> = ({property, index}) => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const loadProperty = () => {
        dispatch(saveScrollPosition(window.scrollY));
        navigate(`/property/${property.id}`);
    }

    return <PropertyCard property={property} loadProperty={loadProperty} index={index}/>
}

export default PropertyCardContainer;
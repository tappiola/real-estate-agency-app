import {useNavigate} from "react-router-dom";
import PropertyCard from "./PropertyCard.component";
import {Property} from "../../types";
import React from "react";
import {saveScrollPosition} from "../../redux/navigation";
import {useAppDispatch} from "../../redux/hooks";
import {useIsMobile} from "../IsMobile";

const PropertyCardContainer: React.FC<{property: Property, index: number}> = ({property, index}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const loadProperty = () => {
        dispatch(saveScrollPosition(window.scrollY));
        navigate(`/property/${property.id}`);
    }

    return <PropertyCard property={property} loadProperty={loadProperty} index={index} isMobile={isMobile}/>
}

export default PropertyCardContainer;
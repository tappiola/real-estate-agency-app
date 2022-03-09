import { useNavigate } from 'react-router-dom';
import React from 'react';
import PropertyCard from './PropertyCard.component';
import { Property } from '../../types';
import useIsMobile from '../IsMobile';

const PropertyCardContainer: React.FC<{ property: Property, index: number }> = ({ property, index }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const loadProperty = () => {
        navigate(`/property/${property.id}`);
    };

    return <PropertyCard property={property} loadProperty={loadProperty} index={index} isMobile={isMobile} />;
};

export default PropertyCardContainer;

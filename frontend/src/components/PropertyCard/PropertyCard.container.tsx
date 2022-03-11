import { Link } from 'react-router-dom';
import React from 'react';
import PropertyCard from './PropertyCard.component';
import { Property } from '../../types';
import useIsMobile from '../IsMobile';

const PropertyCardContainer: React.FC<{ property: Property, index: number }> = ({ property, index }) => {
    const isMobile = useIsMobile();

    return (
      <Link className="PropertyCard-Link" to={`/property/${property.id}`}>
        <PropertyCard property={property} index={index} isMobile={isMobile} />
      </Link>
    );
};

export default PropertyCardContainer;

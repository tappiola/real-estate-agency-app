import { Link } from 'react-router-dom';
import React from 'react';
import PropertyCard from './PropertyCard.component';
import { Property } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { Path } from '../../constants';

const PropertyCardContainer: React.FC<{ property: Property, index: number }> = ({ property, index }) => {
    const { isMobile } = useAppSelector(({ config }) => config);

    return (
      <Link className="PropertyCard-Link" to={`${Path.Property}/${property.id}`}>
        <PropertyCard property={property} index={index} isMobile={isMobile} />
      </Link>
    );
};

export default React.memo(PropertyCardContainer);

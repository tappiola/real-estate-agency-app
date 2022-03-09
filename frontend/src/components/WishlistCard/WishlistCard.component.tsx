import './WishlistCard.style.scss';
import React, { MouseEvent } from 'react';
import CloseIcon from '../CloseIcon';
import { Property } from '../../types';

const WishlistCard: React.FC<{
    property: Property,
    onWishlistRemove: (event: MouseEvent<HTMLDivElement>) => void,
    loadProperty: (event: MouseEvent<HTMLDivElement>) => void
}> = ({
    property,
    onWishlistRemove,
    loadProperty
}) => (
  <div className="WishlistCard-Wrapper" onClick={loadProperty}>
    <h2>{property.title}</h2>
    <p>{property.description}</p>
    <p>{property.city.name}</p>
    <p>{property.propertyType?.name}</p>
    <p className="WishlistCard-Remove" onClick={onWishlistRemove}>
      <CloseIcon />
    </p>
  </div>
);

export default WishlistCard;

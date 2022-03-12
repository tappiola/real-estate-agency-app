import './WishlistCard.style.scss';
import React, { MouseEventHandler } from 'react';
import CloseIcon from '../CloseIcon';
import { Property } from '../../types';

const WishlistCard: React.FC<{
    property: Property,
    onWishlistRemove: MouseEventHandler<HTMLDivElement>,
    loadProperty: MouseEventHandler<HTMLDivElement>
}> = ({
    property,
    onWishlistRemove,
    loadProperty
}) => (
  <div
    className="WishlistCard-Wrapper"
    onClick={loadProperty}
    role="link"
    tabIndex={0}
  >
    <h2>{property.title}</h2>
    <p>{property.description}</p>
    <p>{property.city.name}</p>
    <p>{property.propertyType?.name}</p>
    <div
      role="button"
      tabIndex={0}
      className="WishlistCard-Remove"
      onClick={onWishlistRemove}
    >
      <CloseIcon />
    </div>
  </div>
);

export default WishlistCard;

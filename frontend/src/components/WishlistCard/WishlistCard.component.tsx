import React, { MouseEventHandler, useEffect, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import './WishlistCard.style.scss';
import CloseIcon from '../CloseIcon';
import { Property } from '../../types';
import { formatPrice, getFullTitle } from '../../util';
import { IMAGE_PLACEHOLDER } from '../../constants';

const WishlistCard: React.FC<{
    property: Property,
    onWishlistRemove: MouseEventHandler<HTMLDivElement>,
    loadProperty: MouseEventHandler<HTMLDivElement>
}> = ({
    property,
    onWishlistRemove,
    loadProperty
}) => {
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.innerHTML = sanitizeHtml(property.title);
        }
    }, [property.title]);

    const loadImage = () => {
        const { images } = property;

        return (
          <img
            className="WishlistCard-Image"
            src={images[0]?.link || IMAGE_PLACEHOLDER}
            alt="Property"
          />
        );
    };

    return (
      <div
        className="WishlistCard-Wrapper"
        onClick={loadProperty}
        role="link"
        tabIndex={0}
      >
        <div>
          {loadImage()}
        </div>
        <h2 className="WishlistCard-Price">{formatPrice(property.price)}</h2>
        <h3 className="WishlistCard-Title">{getFullTitle(property)}</h3>
        <p className="WishlistCard-Description" ref={descriptionRef}>{property.title}</p>
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
};

export default WishlistCard;

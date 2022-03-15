import React, { useMemo } from 'react';
import ToggleWishlist from '../ToggleWishlist';
import './PropertyCard.style.scss';
import { Property, Image } from '../../types';
import { Carousel, CarouselItem } from '../Carousel';
import { formatPrice, getFullTitle, sortByKey } from '../../util';
import { AdType, IMAGE_PLACEHOLDER } from '../../constants';
import BedroomIconComponent from '../BedroomIcon';
import BathroomIconComponent from '../BathroomIcon';

const PropertyCardComponent: React.FC<{
    property: Property,
    index: number,
    isMobile: boolean
}> = ({
    property,
    index,
    isMobile
}) => {
    const loadCarouselImages = () => {
        const { images } = property;

        const sortedImages = useMemo(() => sortByKey(images, 'position').slice(0, 15), [images]);

        if (!images.length) {
            return (
              <CarouselItem>
                <img
                  className="PropertyCard-CarouselImg"
                  src={IMAGE_PLACEHOLDER}
                  alt="PlaceholderImage"
                />
              </CarouselItem>
            );
        }

        return sortedImages.map((image: Image) => (
          <CarouselItem key={image.id}>
            <div className="PropertyCard-ImageContainer">
              <img
                className="PropertyCard-CarouselImg"
                src={image.link}
                alt={`Property${image.position}`}
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ));
    };

    const loadSingleImage = () => {
        const { images } = property;

        return (
          <img
            className="PropertyCard-CarouselImg"
            src={images[0]?.link || IMAGE_PLACEHOLDER}
            alt="Property"
            loading="lazy"
          />
        );
    };

    const loadImages = () => {
        if (isMobile) {
            return loadSingleImage();
        }

        return (
          <Carousel width="35vw" height="100%" infinite>
            {loadCarouselImages()}
          </Carousel>
        );
    };

    return (
      <div
        className="PropertyCard"
        id={`property-${index}`}
      >
        <div className="PropertyCard-Images">
          {loadImages()}
        </div>
        <div className="PropertyCard-Data">
          <h2 className="PropertyCard-Price">
            {formatPrice(property.price) + (property.type.name === AdType.Rent ? ' pcm' : '')}
          </h2>
          <p className="PropertyCard-Amenities">
            <BedroomIconComponent />
            {property.bedroomCount}
            <BathroomIconComponent />
            {property.bathroomCount}
          </p>
          <h4 className="PropertyCard-Title">{getFullTitle(property)}</h4>
          <p className="PropertyCard-Address">{property.address}</p>
          <ToggleWishlist property={property} inWishlist={property.isInWishlist} />
        </div>
      </div>
    );
};

export default PropertyCardComponent;

import React, { useEffect, useRef } from 'react';
import { Image, Property as PropertyType } from '../../types';
import ToggleWishlist from '../ToggleWishlist';
import MultiPreview from '../MultiPreview';
import { formatPrice, getFullTitle, sortByKey } from '../../util';
import './Property.style.scss';
import { Carousel, CarouselItem } from '../Carousel';
import Map from '../Map';
import Loader from '../Loader';
import BedroomIconComponent from '../BedroomIcon';
import BathroomIconComponent from '../BathroomIcon';

const Property: React.FC<{
    property: PropertyType,
    isInWishlist: boolean,
    isMobile: boolean,
    navigateBack: () => void,
    onPreviewClick: () => void
}> = ({
    property,
    isInWishlist,
    isMobile,
    navigateBack,
    onPreviewClick
}) => {
    const descRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descRef.current) {
            descRef.current.innerHTML = property.title;
        }
    }, [property.title]);

    const renderImage = (image:Image) => (
      <CarouselItem key={image.id}>
        <div className="Property-ImageContainer">
          <img
            className="Property-CarouselImg"
            src={image.link}
            alt={`Property${image.position}`}
          />
        </div>
      </CarouselItem>
    );

    const renderImages = () => {
        const { images } = property;

        if (!images) {
            return null;
        }
        const sortedImages = sortByKey(images, 'position');

        if (isMobile) {
            return (
              <Carousel width="100vw" height="65vw">
                {images.map((image: Image) => renderImage(image))}
              </Carousel>
            );
        }

        return <MultiPreview images={sortedImages} onPreviewClick={onPreviewClick} />;
    };

    if (!property) {
        return <Loader />;
    }

    return (
      <div className="Property-Container">
        <div
          className="Property-NavigateBack"
          onClick={navigateBack}
          role="link"
          tabIndex={0}
        >
          <i className="fa-solid fa-arrow-left" />
          Back to search results
        </div>
        {renderImages()}
        <div className="Property-Information">
          <div className="Property-Text">
            <div className="Property-Summary">
              <h2 className="Property-Price">{formatPrice(property.price)}</h2>
              <ToggleWishlist property={property} inWishlist={isInWishlist} />
            </div>
            <p className="Property-Title">{getFullTitle(property)}</p>
            <p className="Property-Address">{property.address}</p>
            <p className="Property-Amenities">
              <BedroomIconComponent />
              {`${property.bedroomCount} ${property.bedroomCount === 1 ? 'bedroom' : 'bedrooms'}`}
              <BathroomIconComponent />
              {`${property.bathroomCount} ${property.bathroomCount === 1 ? 'bathroom' : 'bathrooms'}`}
            </p>
            <div className="Property-Description" ref={descRef}>{property.title}</div>
          </div>
          <Map property={property} />
        </div>
      </div>
    );
};

export default Property;

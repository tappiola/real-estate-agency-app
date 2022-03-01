import React from "react";
import ToggleWishlist from "../ToggleWishlist";
import './PropertyCard.style.scss';
import {PropertyType} from "../../types";
import {Carousel, CarouselItem} from "../Carousel";
import {formatPrice, getFullTitle, sortByKey} from "../../util";
import {AdType, IMAGE_PLACEHOLDER} from "../../constants";
import BedroomIconComponent from "../BedroomIcon";
import BathroomIconComponent from "../BathroomIcon";
import temp from './plants.png';

const PropertyCardComponent: React.FC<{property: PropertyType, index: number, loadProperty: () => void}> = ({property, index, loadProperty}) => {
    const loadCarouselImages = () => {
        const {images} = property;

        if (!images.length){
            return <CarouselItem>
                <img
                    className='PropertyCard-CarouselImg'
                    src={IMAGE_PLACEHOLDER}
                    alt="PlaceholderImage"
                />
            </CarouselItem>
        }

        return sortByKey(images, 'position').slice(0, 15).map((image: any) => {
            return <CarouselItem key={image.id}>
            <img
                className='PropertyCard-CarouselImg'
                // src={image.link}
                src={temp}
                alt={`Image${image.position}`}
            />
        </CarouselItem>
        })
    }

    return (
            <div className="PropertyCard" id={`property-${index}`} onClick={loadProperty}>
                <div className='PropertyCard-Carousel'>
                <Carousel width="485px" height="100%" infinite={false} autoplay={false}>
                    {loadCarouselImages()}
                </Carousel>
                </div>
                <div className='PropertyCard-Data'>
                    <h2 className='PropertyCard-Price'>{formatPrice(property.price) + (property.type.name === AdType.Rent ? ' pcm' : '')}</h2>
                    <p className='PropertyCard-Amenities'>
                        <BedroomIconComponent/>
                        {property.bedroomCount}
                        <BathroomIconComponent/>
                        {property.bathroomCount}
                    </p>
                    <h4 className='PropertyCard-Title'>{getFullTitle(property)}</h4>
                    <p className='PropertyCard-Address'>{property.address}</p>
                    <ToggleWishlist property={property} inWishlist={property.isInWishlist}/>
                </div>
            </div>
    );
}

export default PropertyCardComponent;
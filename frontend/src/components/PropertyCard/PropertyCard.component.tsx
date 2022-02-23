import React from "react";
import ToggleWishlist from "../ToggleWishlist";
import './PropertyCard.style.scss';
import {PropertyType} from "../../types";
import {Carousel, CarouselItem} from "../Carousel/Carousel";
import {sortByKey} from "../../util";
import {IMAGE_PLACEHOLDER} from "../../constants";

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

        return sortByKey(images, 'position').map((image: any) => {
            return <CarouselItem key={image.id}>
            <img
                className='PropertyCard-CarouselImg'
                src={image.link}
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
                    <h2>{property.title}</h2>
                    <p>{property.description}</p>
                    <p>{property.city.name}</p>
                    <p>{property.propertyType?.name}</p>
                    <ToggleWishlist property={property} inWishlist={property.isInWishlist}/>
                </div>
            </div>
    );
}

export default PropertyCardComponent;
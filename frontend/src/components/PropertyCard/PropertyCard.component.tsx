import React from "react";
import ToggleWishlist from "../ToggleWishlist";
import './PropertyCard.style.scss';
import {PropertyType} from "../../types";
import {Carousel, CarouselItem} from "../Carousel/Carousel";
import {formatPrice, getHouseTitle, sortByKey} from "../../util";
import {AdType, IMAGE_PLACEHOLDER} from "../../constants";
import BedroomIcon from "../BedroomIcon/BedroomIcon";
import BathroomIcon from "../BathroomIcon/BathroomIcon";

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
                    <h2 className='PropertyCard-Price'>{formatPrice(property.price) + (property.type.name === AdType.Rent ? ' pcm' : '')}</h2>
                    <p className='PropertyCard-Amenities'>
                        <BedroomIcon/>
                        {property.bedroomCount}
                        <BathroomIcon/>
                        {property.bathroomCount}
                    </p>
                    <h4 className='PropertyCard-Title'>{`${getHouseTitle(property.bedroomCount, property.propertyType?.name)} in ${property.city?.name} ${property.type.name === 'sale' ? 'for': 'to'} ${property.type.name}`}</h4>
                    <p className='PropertyCard-Address'>{property.address}</p>
                    <ToggleWishlist property={property} inWishlist={property.isInWishlist}/>
                </div>
            </div>
    );
}

export default PropertyCardComponent;
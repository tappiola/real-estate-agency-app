import './WishlistCard.style.scss';
import CloseIcon from "../CloseIcon";
import React, {MouseEvent} from "react";
import {PropertyType} from "../../types";

const WishlistCard: React.FC<{property: PropertyType, onWishlistRemove: (event: MouseEvent<HTMLDivElement>) => void, loadProperty: (event: MouseEvent<HTMLDivElement>) => void}> = ({property, onWishlistRemove, loadProperty}) => {

    return (
        <div className="WishlistCard-Wrapper" onClick={loadProperty}>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.city.name}</p>
            <p>{property.propertyType?.name}</p>
            <p className="WishlistCard-Remove" onClick={onWishlistRemove}>
                <CloseIcon/>
            </p>
        </div>
    );
}

export default WishlistCard;
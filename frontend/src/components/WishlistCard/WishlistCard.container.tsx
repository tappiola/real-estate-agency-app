import {removeFromWishlist} from "../../queries";
import './WishlistCard.style.scss';
import {PropertyType} from "../../types";
import React from "react";
import WishlistCard from "./WishlistCard.component";

const WishlistCardContainer: React.FC<{
    property: PropertyType,
    updatePropertiesList: (id: Number) => void}
    > = ({
            property,
            updatePropertiesList
        }) => {

    const onWishlistRemove = async () => {
        const {id} = property;
        try {
            await removeFromWishlist(id);
            updatePropertiesList(id);
        }
        catch (e){
            console.log(e);
        }

    }

    return (
        <WishlistCard property={property} onWishlistRemove={onWishlistRemove}/>
    );
}

export default WishlistCardContainer;
import {removeFromWishlist} from "../../queries";
import './WishlistCard.style.scss';
import {PropertyType} from "../../types";
import React, {MouseEvent} from "react";
import WishlistCard from "./WishlistCard.component";
import {useNavigate} from "react-router-dom";

const WishlistCardContainer: React.FC<{
    property: PropertyType,
    updatePropertiesList: (id: Number) => void}
    > = ({
            property,
            updatePropertiesList
        }) => {

    let navigate = useNavigate();

    const loadProperty = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        console.log('save page position');
        navigate(`/property/${property.id}`);
    }

    const onWishlistRemove = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

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
        <WishlistCard property={property} onWishlistRemove={onWishlistRemove} loadProperty={loadProperty}/>
    );
}

export default WishlistCardContainer;
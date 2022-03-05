import {removeFromWishlist} from "../../queries";
import './WishlistCard.style.scss';
import {Property} from "../../types";
import React, {MouseEvent} from "react";
import WishlistCard from "./WishlistCard.component";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {enqueueToast} from "../../redux/Notifier";
import {ToastTypes} from "../../constants";

const WishlistCardContainer: React.FC<{
    property: Property,
    updatePropertiesList: (id: Number) => void}
    > = ({
            property,
            updatePropertiesList
        }) => {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loadProperty = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        navigate(`/property/${property.id}`);
    }

    const onWishlistRemove = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const {id} = property;
        try {
            await removeFromWishlist(id);
            updatePropertiesList(id);

            dispatch(enqueueToast({
                message: 'Removed from wishlist',
                type: ToastTypes.Success,
            }));
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
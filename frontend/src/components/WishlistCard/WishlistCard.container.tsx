import './WishlistCard.style.scss';
import {PropertyType} from "../../types";
import React, {MouseEvent} from "react";
import WishlistCard from "./WishlistCard.component";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {enqueueToast} from "../../redux/Notifier";
import {ToastTypes} from "../../constants";
import {useMutation} from "@apollo/client";
import {GET_WISHLIST, REMOVE_WISHLIST_ITEM} from "../../apollo/queries";

const WishlistCardContainer: React.FC<{
    property: PropertyType,
}> = ({property}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [removeWishlistItem] = useMutation(REMOVE_WISHLIST_ITEM, {
        refetchQueries: [GET_WISHLIST],
    });

    const loadProperty = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        navigate(`/property/${property.id}`);
    }

    const onWishlistRemove = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const {id} = property;
        await removeWishlistItem({
            variables: {propertyId: id},
            onCompleted: data => {
                dispatch(enqueueToast({
                    message: 'Removed from wishlist',
                    type: ToastTypes.Success,
                }));
            }
        });
    }

    return (
        <WishlistCard property={property} onWishlistRemove={onWishlistRemove} loadProperty={loadProperty}/>
    );
}

export default WishlistCardContainer;
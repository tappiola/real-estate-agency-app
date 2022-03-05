import React, {MouseEvent, useState} from "react";
import {addToWishlist, removeFromWishlist} from "../../queries";
import {PropertyType} from "../../types";
import ToggleWishlist from "./ToggleWishlist.component";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {enqueueToast} from "../../redux/Notifier";
import {ToastTypes} from "../../constants";

const ToggleWishlistContainer: React.FC<{property: PropertyType, inWishlist: boolean}> = ({property, inWishlist}) => {
    const [isInWishlist, setIsInWishlist] = useState(inWishlist);
    const { isAuthorized } = useAppSelector(({ user }) => user);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onWishlistToggle: (e: MouseEvent<HTMLParagraphElement>) => Promise<void> = async (e: MouseEvent) => {

        e.stopPropagation();

        if (!isAuthorized){
            dispatch(enqueueToast({
                message: 'Please, login to work with wishlist',
                type: ToastTypes.Warning,
            }));
            return;
        }

        if(!property){
            return;
        }

        const {id} = property;

        const resp = isInWishlist ? await removeFromWishlist(id) : await addToWishlist(id);
        setIsClicked(!isClicked);

        dispatch(enqueueToast({
            message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
            type: ToastTypes.Success,
        }));

        const key = isInWishlist ? 'removeFromWishlist' : 'addToWishlist';
        const {data: {[key]: {success}}} = await resp.json();

        if(success){
            setIsInWishlist(!isInWishlist);
        }
    }

    return <ToggleWishlist onWishlistToggle={onWishlistToggle} isInWishlist={isInWishlist} isClicked={isClicked}/>;
}

export default ToggleWishlistContainer;
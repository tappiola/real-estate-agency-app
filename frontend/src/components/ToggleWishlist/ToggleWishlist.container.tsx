import React, {useState} from "react";
import {addToWishlist, removeFromWishlist} from "../../queries";
import {isAuthorized} from "../../graphql";
import {PropertyType} from "../../types";
import ToggleWishlist from "./ToggleWishlist.component";

const ToggleWishlistContainer: React.FC<{property: PropertyType, inWishlist: boolean}> = ({property, inWishlist}) => {
    const [isInWishlist, setIsInWishlist] = useState(inWishlist);

    const onWishlistToggle = async (e: MouseEvent) => {

        e.stopPropagation();

        if (!isAuthorized){
            alert('Please, login to work with wishlist');
            return;
        }

        if(!property){
            return;
        }

        const {id} = property;

        const resp = isInWishlist ? await removeFromWishlist(id): await addToWishlist(id);

        const key = isInWishlist ? 'removeFromWishlist' : 'addToWishlist';
        const {data: {[key]: {success}}} = await resp.json();

        if(success){
            setIsInWishlist(!isInWishlist);
        }
    }

    return <ToggleWishlist onWishlistToggle={onWishlistToggle} isInWishlist={isInWishlist}/>;
}

export default ToggleWishlistContainer;
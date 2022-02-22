import WishlistIcon from "../WishlistIcon";
import React, {MouseEventHandler} from "react";

const WishlistToggle : React.FC<{isInWishlist:boolean, onWishlistToggle: (e: any) => void}> = ({isInWishlist, onWishlistToggle}) => {

    return <>
        <p onClick={onWishlistToggle}>
        <WishlistIcon isActive={isInWishlist}/>
    </p>
    <p>{isInWishlist ? 'IN WISHLIST': 'NOT IN WISHLIST' }</p>
        </>
}

export default WishlistToggle;
import WishlistIcon from "../WishlistIcon";
import React from "react";

const WishlistToggle : React.FC<{isInWishlist:boolean, onWishlistToggle: () => void}> = ({isInWishlist, onWishlistToggle}) => {
    return <>
        <p onClick={onWishlistToggle}>
        <WishlistIcon isActive={isInWishlist}/>
    </p>
    <p>{isInWishlist ? 'IN WISHLIST': 'NOT IN WISHLIST' }</p>
        </>
}

export default WishlistToggle;
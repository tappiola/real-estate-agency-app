import WishlistIcon from "../WishlistIcon";
import React, {MouseEvent} from "react";
import './ToggleWishlist.container';
import './WishlistToggle.style.scss';

const WishlistToggle : React.FC<{isInWishlist:boolean, onWishlistToggle: (e: MouseEvent<HTMLParagraphElement>) =>  Promise<void>, isClicked?: boolean}> = ({isInWishlist, onWishlistToggle, isClicked}) => {

    return <div className='WishlistToggle-Container'>
        <p className='WishlistToggle-Heart' onClick={onWishlistToggle}>
            <WishlistIcon isActive={isInWishlist} isClicked={isClicked}/>
        </p>
        <p className='WishlistToggle-Label'>{isInWishlist ? 'Saved': 'Save' }</p>
        </div>
}

export default WishlistToggle;
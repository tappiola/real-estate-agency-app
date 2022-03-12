import React, { MouseEventHandler } from 'react';
import WishlistIcon from '../WishlistIcon';
import './WishlistToggle.style.scss';

const ToggleWishlist : React.FC<{
    isInWishlist: boolean,
    onWishlistToggle: MouseEventHandler<HTMLParagraphElement>,
    isClicked?: boolean
}> = ({ isInWishlist, onWishlistToggle, isClicked }) => (
  <div className="WishlistToggle-Container">
    <div
      role="button"
      tabIndex={0}
      className="WishlistToggle-Heart"
      onClick={onWishlistToggle}
    >
      <WishlistIcon isActive={isInWishlist} isClicked={isClicked} />
    </div>
    <p className="WishlistToggle-Label">{isInWishlist ? 'Saved' : 'Save' }</p>
  </div>
);

export default ToggleWishlist;

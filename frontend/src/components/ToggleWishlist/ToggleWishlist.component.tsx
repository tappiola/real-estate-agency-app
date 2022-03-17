import React, { MouseEventHandler } from 'react';
import WishlistIcon from '../WishlistIcon';
import './WishlistToggle.style.scss';

const ToggleWishlist : React.FC<{
    isInWishlist: boolean,
    onWishlistToggle: MouseEventHandler<HTMLParagraphElement>,
    isClicked: boolean,
    onHeartBlur: () => void
}> = ({
    isInWishlist,
    onWishlistToggle,
    isClicked,
    onHeartBlur
}) => (
  <div
    className="WishlistToggle-Container"
    role="button"
    tabIndex={0}
    onClick={onWishlistToggle}
  >
    <div className="WishlistToggle-Heart" onMouseLeave={onHeartBlur}>
      <WishlistIcon isActive={isInWishlist} isClicked={isClicked} />
    </div>
    <p className="WishlistToggle-Label">{isInWishlist ? 'Saved' : 'Save' }</p>
  </div>
);

export default ToggleWishlist;

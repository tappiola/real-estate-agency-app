import React, { MouseEventHandler, useState } from 'react';
import { addToWishlist, removeFromWishlist } from '../../queries';
import { Property } from '../../types';
import ToggleWishlist from './ToggleWishlist.component';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { enqueueToast } from '../../redux/notifier';
import { ToastTypes } from '../../constants';

const ToggleWishlistContainer: React.FC<{ property: Property, inWishlist: boolean }> = ({ property, inWishlist }) => {
    const [isInWishlist, setIsInWishlist] = useState(inWishlist);
    const { isAuthorized } = useAppSelector(({ user }) => user);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onWishlistToggle: MouseEventHandler<HTMLParagraphElement> = async (e) => {
        e.stopPropagation();

        if (!isAuthorized) {
            dispatch(enqueueToast({
                message: 'Please, login to work with wishlist',
                type: ToastTypes.Warning
            }));

            return;
        }

        if (!property) {
            return;
        }

        const { id } = property;

        const resp = isInWishlist ? await removeFromWishlist(id) : await addToWishlist(id);
        setIsClicked(!isClicked);

        dispatch(enqueueToast({
            message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
            type: ToastTypes.Success
        }));

        const key = isInWishlist ? 'removeFromWishlist' : 'addToWishlist';
        const { data: { [key]: { success } } } = await resp.json();

        if (success) {
            setIsInWishlist(!isInWishlist);
        }
    };

    return (
      <ToggleWishlist
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
        isClicked={isClicked}
      />
    );
};

export default ToggleWishlistContainer;

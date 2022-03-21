import React, {
    MouseEventHandler, useCallback, useEffect, useState
} from 'react';
import { addToWishlist, removeFromWishlist } from '../../graphql/queries';
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

    const onWishlistToggle: MouseEventHandler<HTMLParagraphElement> = useCallback(async (e) => {
        e.preventDefault();

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

        try {
            const { id } = property;
            let success;

            if (!isInWishlist) {
                const result = await addToWishlist(id);
                success = result.addToWishlist.success;
            } else {
                const result = await removeFromWishlist(id);
                success = result.removeFromWishlist.success;
            }

            if (success) {
                dispatch(enqueueToast({
                    message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
                    type: ToastTypes.Success
                }));

                setIsInWishlist((prevInWishlist) => !prevInWishlist);
            }
        } catch (err) {
            dispatch(enqueueToast({
                message: isInWishlist
                    ? 'Unable to remove property from wishlist'
                    : 'Unable to add property to wishlist',
                type: ToastTypes.Error
            }));
        } finally {
            setIsClicked(true);
        }
    }, [dispatch, isAuthorized, isInWishlist, property]);

    useEffect(() => {
        if (!isAuthorized) {
            setIsInWishlist(false);
        }
    }, [isAuthorized]);

    return (
      <ToggleWishlist
        onWishlistToggle={onWishlistToggle}
        isInWishlist={isInWishlist}
        isClicked={isClicked}
        onHeartBlur={() => setIsClicked(false)}
      />
    );
};

export default ToggleWishlistContainer;

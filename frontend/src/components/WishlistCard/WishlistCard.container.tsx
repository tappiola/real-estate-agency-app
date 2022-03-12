import './WishlistCard.style.scss';
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Property } from '../../types';
import WishlistCard from './WishlistCard.component';
import { useAppDispatch } from '../../redux/hooks';
import { enqueueToast } from '../../redux/notifier';
import { ToastTypes } from '../../constants';
import { GET_WISHLIST, REMOVE_WISHLIST_ITEM } from '../../apollo/queries';

const WishlistCardContainer: React.FC<{
    property: Property,
}> = ({ property }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [removeWishlistItem] = useMutation(REMOVE_WISHLIST_ITEM, {
        refetchQueries: [GET_WISHLIST]
    });

    const loadProperty: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        navigate(`/property/${property.id}`);
    };

    const onWishlistRemove: MouseEventHandler<HTMLDivElement> = async (e) => {
        e.stopPropagation();

        const { id } = property;
        await removeWishlistItem({
            variables: { propertyId: id },
            onCompleted: () => {
                dispatch(enqueueToast({
                    message: 'Removed from wishlist',
                    type: ToastTypes.Success
                }));
            }
        });
    };

    return (
      <WishlistCard property={property} onWishlistRemove={onWishlistRemove} loadProperty={loadProperty} />
    );
};

export default WishlistCardContainer;

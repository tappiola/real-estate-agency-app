import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import Wishlist from './Wishlist.component';
import { useAppSelector } from '../../store/hooks';
import { GET_WISHLIST } from '../../apollo/queries';
import { AdType } from '../../constants';
import { Property } from '../../types';

const WishlistContainer = () => {
    const [adType, setAdType] = useState(AdType.Sale);
    const { isAuthorized } = useAppSelector(({ user }) => user);
    const {
        loading, error, data, refetch
    } = useQuery(GET_WISHLIST);

    useEffect(() => {
        refetch();
    }, []);

    const propertiesData = useMemo(() => {
        if (!data) {
            return [];
        }

        const { getWishlist = [] } = data;

        return getWishlist.filter((property: Property) => property.type.name === adType);
    }, [adType, data]);

    return (
      <Wishlist
        properties={propertiesData}
        isAuthorized={isAuthorized}
        hasError={!!error}
        adType={adType}
        setAdType={setAdType}
        isLoading={loading}
      />
    );
};

export default WishlistContainer;

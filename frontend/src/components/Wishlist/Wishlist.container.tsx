import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import Wishlist from './Wishlist.component';
import Loader from '../Loader';
import { useAppSelector } from '../../redux/hooks';
import { GET_WISHLIST } from '../../apollo/queries';
import { AdType } from '../../constants';
import { Property } from '../../types';
import GenericMessage from '../GenericMessage';

const WishlistContainer = () => {
    const [adType, setAdType] = useState(AdType.Sale);
    const { isAuthorized } = useAppSelector(({ user }) => user);
    const { loading, error, data } = useQuery(GET_WISHLIST);

    const propertiesData = useMemo(() => {
        if (!data) {
            return [];
        }

        const { getWishlist = [] } = data;

        return getWishlist.filter((property: Property) => property.type.name === adType);
    }, [adType, data]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <GenericMessage>Fetching wishlist failed</GenericMessage>;
    }

    return (
      <Wishlist
        properties={propertiesData}
        isAuthorized={isAuthorized}
        hasError={!!error}
        adType={adType}
        setAdType={setAdType}
      />
    );
};

export default WishlistContainer;

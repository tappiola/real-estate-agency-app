import { useQuery } from '@apollo/client';
import Wishlist from './Wishlist.component';
import Loader from '../Loader';
import { useAppSelector } from '../../redux/hooks';
import { GET_WISHLIST } from '../../apollo/queries';

const WishlistContainer = () => {
    const { isAuthorized } = useAppSelector(({ user }) => user);
    const { loading, error, data } = useQuery(GET_WISHLIST);

    if (loading) {
        return <Loader />;
    }

    return (
      <Wishlist
        properties={data?.getWishlist}
        isAuthorized={isAuthorized}
        hasError={!!error}
      />
    );
};

export default WishlistContainer;

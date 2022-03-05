import {useEffect, useState} from "react";
import {getWishlist} from "../../queries";
import Wishlist from "./Wishlist.component";
import {Property} from "../../types";
import {useAppSelector} from "../../redux/store";

const WishlistContainer = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { isAuthorized } = useAppSelector(({ user }) => user);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await getWishlist();
                const {data, errors} = await response.json();

                if (errors) {
                    setError(errors[0].message);
                }

                setProperties(data.getWishlist);
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const updatePropertiesList = (id: Number) => {
        setProperties(properties.filter((p: Property) => p.id !== id));
    }

    if (error === 'User is not authenticated'){
        return <h4>Please, login to access wishlist</h4>
    }

    return <Wishlist isLoading={isLoading} properties={properties} updatePropertiesList={updatePropertiesList} isAuthorized={isAuthorized}/>
}

export default WishlistContainer;
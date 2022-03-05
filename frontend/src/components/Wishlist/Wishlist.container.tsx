import {useState} from "react";
import Wishlist from "./Wishlist.component";
import Loader from "../Loader";
import {PropertyType} from "../../types";
import {useAppSelector} from "../../redux/store";

import {useQuery} from "@apollo/client";
import {GET_WISHLIST} from "../../apollo/queries";

const WishlistContainer = () => {
    const { isAuthorized } = useAppSelector(({ user }) => user);
    const {loading: wishlistLoading, error: gqlError, data: wishlistData} = useQuery(GET_WISHLIST)
    const [properties, setProperties] = useState([]);

    console.log({wishlistLoading, gqlError, wishlistData});

    if(wishlistLoading){
        return <Loader/>;
    }

    if (gqlError){
        return <h4>Something went wrong...</h4>
    }

    // useEffect(() => {
    //     const fetchWishlist = async () => {
    //         try {
    //             const response = await getWishlist();
    //             const {data, errors = null} = await response.json();
    //
    //             console.log({data, errors});
    //
    //             if(errors){
    //                 setError(errors[0].extensions?.code ?? errors[0].message);
    //             }
    //
    //             setProperties(data.getWishlist);
    //             setIsLoading(false);
    //         } catch (e){
    //             console.log(e);
    //             setIsLoading(false);
    //         }
    //     };
    //
    //     fetchWishlist();
    // }, []);

    const updatePropertiesList = (id: Number) => {
        console.log({updatePropertiesList: properties});
        setProperties(properties.filter((p: PropertyType) => p.id !== id));
    }

    return (
        <Wishlist
            properties={wishlistData.getWishlist}
            updatePropertiesList={updatePropertiesList}
            isAuthorized={isAuthorized}
        />
    )
}

export default WishlistContainer;
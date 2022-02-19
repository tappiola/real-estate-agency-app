import {useEffect, useState} from "react";
import {getWishlist} from "../queries";
import {isAuthorized} from "../graphql";
import Wishlist from "./Wishlist.component";
import {PropertyType} from "../types";

const WishlistContainer = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await getWishlist();
                const {data} = await response.json();
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
        setProperties(properties.filter((p: PropertyType) => p.id !== id));
    }

    if (!isAuthorized){
        return <h4>Please, login to work with wishlist</h4>
    }

    return <Wishlist isLoading={isLoading} properties={properties} updatePropertiesList={updatePropertiesList}/>
}

export default WishlistContainer;
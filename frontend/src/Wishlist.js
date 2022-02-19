import {useEffect, useState} from "react";
import WishlistCard from "./WishlistCard/WishlistCard.container";
import {getWishlist} from "./queries";
import Loader from "./Loader";
import {isAuthorized} from "./graphql";

const Wishlist = () => {
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

    const updatePropertiesList = (id) => {
        setProperties(properties.filter(p => p.id !== id));
    }

    if (!isAuthorized){
        return <h4>Please, login to work with wishlist</h4>
    }

    return <>
        <h1>Wishlist</h1>
        {properties.map(p => <WishlistCard key={p.id} property = {p} updatePropertiesList={ updatePropertiesList}/>)}
        {isLoading && <Loader/>}
    </>
}

export default Wishlist;
import {useEffect, useState} from "react";
import WishlistCard from "./WishlistCard";
import {getWishlist} from "./queries";
import Loader from "./Loader";

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

    return <>
        <h1>Wishlist</h1>
        {properties.map(p => <WishlistCard key={p.id} property = {p} updatePropertiesList={ updatePropertiesList}/>)}
        {isLoading && <Loader/>}
    </>
}

export default Wishlist;
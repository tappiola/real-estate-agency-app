import {useEffect, useState} from "react";
import Property from "./Property.component";
import {addToWishlist, getProperty, removeFromWishlist} from "../queries";
import Loader from "../Loader";
import {useParams} from "react-router-dom";
import {isAuthorized} from "../graphql";

const PropertyContainer = () => {
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const params = useParams();
    const {id} = params;

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await getProperty(+id);
                const {data} = await response.json();
                const property = data.getProperty;
                setProperty(property);
                setIsInWishlist(property.isInWishlist);
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const onWishlistToggle = async () => {

        if (!isAuthorized){
            alert('Please, login to work with wishlist');
            return;
        }

        const resp = isInWishlist ? await removeFromWishlist(property.id): await addToWishlist(property.id);

        const key = isInWishlist ? 'removeFromWishlist' : 'addToWishlist';
        const {data: {[key]: {success}}} = await resp.json();

        if(success){
            setIsInWishlist(!isInWishlist);
        }
    }

    if (isLoading){
        return <Loader/>;
    }

    if (!property){
        return <p>Not found</p>;
    }

    return <Property property={property} onWishlistToggle={onWishlistToggle} isInWishlist={isInWishlist}/>;
}

export default PropertyContainer;
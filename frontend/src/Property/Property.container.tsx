import {useEffect, useState} from "react";
import Property from "./Property.component";
import {addToWishlist, getProperty, removeFromWishlist} from "../queries";
import Loader from "../Loader";
import {useParams} from "react-router-dom";
import {isAuthorized} from "../graphql";
import {PropertyType} from "../types";

const PropertyContainer = () => {
    const [property, setProperty] = useState<PropertyType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const params = useParams();
    const {id} = params;

    useEffect(() => {
        if (!id){
            return;
        }

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

        if(!property){
            return;
        }

        const {id} = property;

        const resp = isInWishlist ? await removeFromWishlist(id): await addToWishlist(id);

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
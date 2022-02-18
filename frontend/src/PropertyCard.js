import WishlistIcon from "./WishlistIcon";
import {useState} from "react";
import {addToWishlist, removeFromWishlist} from "./queries";
import {isAuthorized} from "./graphql";

const PropertyCard = ({property}) => {
    const [isInWishlist, setIsInWishlist] = useState(property.isInWishlist);

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

    return (
        <div>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.city.name}</p>
            <p>{property.propertyType?.name}</p>
            <p onClick={onWishlistToggle}>
                <WishlistIcon isActive={isInWishlist}/>
            </p>
            <p>{isInWishlist ? 'IN WISHLIST': 'NOT IN WISHLIST' }</p>
        </div>
    );
}

export default PropertyCard;
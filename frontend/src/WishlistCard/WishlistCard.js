import {removeFromWishlist} from "../queries";
import './WishlistCard.style.scss';

const PropertyCard = ({property, updatePropertiesList}) => {

    const onWishlistRemove = async () => {
        const {id} = property;
        try {
            await removeFromWishlist(id);
            updatePropertiesList(id);
        }
        catch (e){
            console.log(e);
        }

    }

    return (
        <div className="WishlistCard-Wrapper">
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.city.name}</p>
            <p>{property.propertyType?.name}</p>
            <button onClick={onWishlistRemove}>Remove</button>
        </div>
    );
}

export default PropertyCard;
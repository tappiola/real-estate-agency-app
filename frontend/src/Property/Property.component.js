import WishlistIcon from "../WishlistIcon";

const Property = ({property, isInWishlist, onWishlistToggle}) => {
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

export default Property;
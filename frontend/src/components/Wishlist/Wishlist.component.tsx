import WishlistCard from "../WishlistCard";
import Loader from "../Loader";
import {PropertyType} from "../../types";
import React from "react";

const Wishlist: React.FC<{properties: PropertyType[], isLoading: boolean, updatePropertiesList: (id: Number) => void, isAuthorized: boolean}>
    = ({properties, isLoading, updatePropertiesList, isAuthorized}) => {

    if (!isAuthorized){
        return <h4>Please, login to work with wishlist</h4>
    }

    if(!properties.length){
        return <h4>Wishlist is Empty</h4>
    }

    return <>
        <h1>Wishlist</h1>
        {properties.map((p: PropertyType) => <WishlistCard key={p.id} property = {p} updatePropertiesList={ updatePropertiesList}/>)}
        {isLoading && <Loader/>}
    </>
}

export default Wishlist;
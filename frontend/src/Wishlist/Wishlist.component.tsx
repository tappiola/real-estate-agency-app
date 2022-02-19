import WishlistCard from "../WishlistCard/WishlistCard.container";
import Loader from "../Loader";
import {isAuthorized} from "../graphql";
import {PropertyType} from "../types";
import React from "react";

const Wishlist: React.FC<{properties: PropertyType[], isLoading: boolean, updatePropertiesList: (id: Number) => void}>
    = ({properties, isLoading, updatePropertiesList}) => {
    if (!isAuthorized){
        return <h4>Please, login to work with wishlist</h4>
    }

    return <>
        <h1>Wishlist</h1>
        {properties.map((p: PropertyType) => <WishlistCard key={p.id} property = {p} updatePropertiesList={ updatePropertiesList}/>)}
        {isLoading && <Loader/>}
    </>
}

export default Wishlist;
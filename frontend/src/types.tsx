export type CityType = {
    id: number
    name: String
}

export type TypeOfPropertyType = {
    id: number
    name: String
}


export type PropertyType = {
    id: number,
    title: String
    description: String
    city: CityType
    propertyType: TypeOfPropertyType,
    isInWishlist: Boolean
};
export type CityType = {
    id: number
    name: String
}

export type TypeOfPropertyType = {
    id: number
    name: String
}

export type Image = {
    id: number,
    position: number,
    link: string
}

export type PropertyType = {
    id: number,
    title: String
    description: String
    city: CityType
    images: Image[]
    propertyType: TypeOfPropertyType,
    isInWishlist: boolean
};
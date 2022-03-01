export type CityType = {
    id: number
    name: string
}

export type TypeOfPropertyType = {
    id: number
    name: string
}

export type Type = {
    id: number
    name: string
}

export type Image = {
    id: number,
    position: number,
    link: string
}

export type PropertyType = {
    id: number,
    title: string
    description: string
    city: CityType
    images: Image[]
    propertyType: TypeOfPropertyType,
    isInWishlist: boolean,
    price: number,
    bedroomCount: number,
    bathroomCount: number,
    address: string
    type: Type
};
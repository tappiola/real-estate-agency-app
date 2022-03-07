import {Filter, ToastTypes} from "./constants";

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

export type Property = {
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
    type: Type,
    longitude: number,
    latitude: number
};

export type SelectOption = {
    id: number,
    value: string
    name: string
}

export type FilterParams = { [key in Filter]?: string};

export type Toast = {
    id: number,
    message: string,
    type: ToastTypes,
    duration: number
}
import { AdType, Filter, ToastTypes } from './constants';

export type CityType = {
    id: number
    name: string
};

export type PropertyType = {
    id: number
    name: string
};

export type Type = {
    id: number
    name: AdType
};

export type Image = {
    id: number,
    position: number,
    link: string
};

export type Property = {
    id: number,
    title: string
    description: string
    city: CityType
    images: Image[]
    propertyType: PropertyType,
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
    name: string | number
};

export type FilterParams = { [key in Filter]?: string };

export type Toast = {
    id: number,
    message: string,
    type: ToastTypes,
    duration: number
};

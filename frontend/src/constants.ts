export const HOST = 'http://192.168.0.15';

export enum ToastTypes {
    Success,
    Error,
    Warning,
    Info
}

export const accessToken =
    'pk.eyJ1IjoidGFwcGlvbGEiLCJhIjoiY2t6eHhuM2N6MDYyMTJ2cDcxcDVsem8zNiJ9.OByK2fsCvb8XsvT2OYUEjA';

export const IMAGE_PLACEHOLDER = 'https://homes.madeeasy.app/img/no-propertyfound.png';

export enum AdType {
    Rent = 'rent',
    Sale = 'sale'
}

export enum Filter {
    City = 'city',
    PropertyType = 'propertyType',
    MinPrice = 'minPrice',
    MaxPrice = 'maxPrice',
    MinBeds = 'minBeds',
    MaxBeds = 'maxBeds',
}
export const HOST = 'http://localhost';

export enum ToastTypes {
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning',
    Info = 'Info'
}

export const accessToken = 'pk.eyJ1IjoidGFwcGlvbGEiLCJhIjoiY2t6eHhuM2N6MDYyMTJ2cDcxcDVsem8zNiJ9.OByK2fsCvb8XsvT2OYUEjA';

export const TEN_MINUTES = 600000;

// eslint-disable-next-line max-len
export const IMAGE_PLACEHOLDER = 'https://tappiola-real-estate-agency-bucket.s3.eu-west-1.amazonaws.com/no-photo-available.jpg';

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
    Page = 'page'
}

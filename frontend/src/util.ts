import jwt_decode from 'jwt-decode';
import { AdType } from './constants';
import { JwtDecodeResult } from './graphql/types';
import { Property } from './types';
import { UseInputType } from './hooks/useInput';

export const sortByKey = <T extends object, U extends keyof T> (values: T[], sortKey: U) => [...values].sort(
    (a, b) => {
        if (a[sortKey] < b[sortKey]) {
            return -1;
        }

        if (a[sortKey] > b[sortKey]) {
            return 1;
        }

        return 0;
    }
);

export const formatPrice = (price: number, currency = 'GBP') => {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return new Intl.NumberFormat(language, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

export const getHouseTitle = (bedroomCount: number, propertyType: string) => {
    if (bedroomCount === 0) {
        return 'Studio apartment';
    }

    return `${bedroomCount} bed ${propertyType.toLowerCase()}`;
};

export const getFullTitle = (property : Property) => {
    const title = getHouseTitle(property.bedroomCount, property.propertyType?.name);
    const preposition = property.type.name === AdType.Sale ? 'for' : 'to';
    return `${title} in ${property.city?.name} ${preposition} ${property.type.name}`;
};

export const getAuthToken = () => {
    let authToken = localStorage.getItem('token');

    if (authToken) {
        const decodedToken = jwt_decode<JwtDecodeResult>(authToken);

        console.log({ expTime: decodedToken.exp * 1000, currentTime: new Date().getTime() });

        // If token has expired, there is no sense to pass it to server
        // Ideally, we should have token refresh flow here
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            authToken = null;
            localStorage.removeItem('token');
        }
    }

    return authToken;
};

export const transformFormData = (data: UseInputType[]) => data.reduce((prev, field) => ({
    ...prev,
    [field.apiField || field.name]: field.value
}), {});

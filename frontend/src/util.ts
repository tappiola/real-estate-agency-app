import { AdType } from './constants';
import { Property } from './types';

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

export const getSavedToken = () => {
    const token = localStorage.getItem('token');
    return (token && token !== 'null') ? token : null;
};

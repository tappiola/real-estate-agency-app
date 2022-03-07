import {AdType} from "./constants";
import {Property} from "./types";

export const sortByKey = <T extends object, U extends keyof T> (values: T[], sortKey: U) => {
    return [...values].sort(
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
}

export const formatPrice = (price: number, currency = 'GBP') => {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return new Intl.NumberFormat(language, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

export const getFullTitle = (property : Property) => {
    return `${getHouseTitle(property.bedroomCount, property.propertyType?.name)} in ${property.city?.name} ${property.type.name === AdType.Sale ? 'for': 'to'} ${property.type.name}`
}

export const getHouseTitle = (bedroomCount: number, propertyType: string) => {
    if (bedroomCount === 0) {
        return 'Studio apartment';
    }

    return `${bedroomCount} bed ${propertyType.toLowerCase()}`;
}

export const getSavedToken = () => {
    return localStorage.getItem('token');
}

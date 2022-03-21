import { AdType } from './constants';
import { Property } from './types';
import { UseInputType } from './hooks/useInput2';

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

export const getSavedToken = () => localStorage.getItem('token');

export const transformFormData = (data: UseInputType[]) => data.reduce((prev, field) => ({
    ...prev,
    [field.apiField || field.name]: field.value
}), {});

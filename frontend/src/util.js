import {AdType} from "./constants";

export const sortByKey = (values, sortKey) => values.sort(
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


export const formatPrice = (price, currency = 'GBP') => {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return new Intl.NumberFormat(language, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

export const getFullTitle = (property) => {
    return `${getHouseTitle(property.bedroomCount, property.propertyType?.name)} in ${property.city?.name} ${property.type.name === AdType.Sale ? 'for': 'to'} ${property.type.name}`
}

export const getHouseTitle = (bedroomCount, propertyType) => {
    if (bedroomCount === 0) {
        return 'Studio apartment';
    }

    return `${bedroomCount} bed ${propertyType.toLowerCase()}`;
}
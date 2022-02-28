import CitiesSelect from "../CitiesSelect";
import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {enqueueToast} from "../../redux/Notifier";
import {AdType, Filter, ToastTypes} from "../../constants";
import {useAppDispatch} from "../../redux/store";
import PropertyTypesSelect from "../PropertyTypesSelect/PropertyTypesSelect.container";
import Select from "../Select";
import {MAX_BEDROOMS, PRICE_RANGE} from "./AdvancedSearchForm.config";
import {formatPrice} from "../../util";

const AdvancedSearchForm: React.FC<{searchType: AdType}> = ({searchType}) => {

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getFilterParams = (params: Filter[]) =>  params.reduce((prev, param) => {
            const value = searchParams.get(param);
            const filterValue = value ? {[param]: value} : {};
            return {...prev, ...filterValue};
        }
    , {});

    const [filterSettings, setFilterSettings] = useState<{ [key in Filter]?: string}>(getFilterParams(Object.values(Filter)));

    const onButtonClick = () => {
        // @ts-ignore
        if (!filterSettings[Filter.City]){
            dispatch(enqueueToast({
                message: 'City is required',
                type: ToastTypes.Warning,
            }));
            return;
        }

        const queryString = new URLSearchParams(filterSettings).toString();

        navigate('?' + queryString);
    }

    const getMinPriceOptions = () => {
        const maxPrice = filterSettings[Filter.MaxPrice];

        return PRICE_RANGE[searchType]
            .filter(price => !maxPrice || price <= Number(filterSettings[Filter.MaxPrice]))
            .map(price => ({id: price, name: formatPrice(price)}));
    }

    const getMaxPriceOptions = () => {
        const minPrice = filterSettings[Filter.MinPrice];

        return PRICE_RANGE[searchType]
            .filter(price => !minPrice || price >= Number(minPrice))
            .map(price => ({id: price, name: formatPrice(price)}));
    }

    const getBedroomsLabel = (count: number) => {
        if (count === MAX_BEDROOMS ){
            return `${count}+`;
        }

        if (count === 0) {
            return 'Studio';
        }

        return count;
    }

    const getMinBedroomsOptions = () => {
        const maxBeds = filterSettings[Filter.MaxBeds];

        return Array.from(Array(MAX_BEDROOMS + 1).keys())
            .filter(beds => !maxBeds || beds <= Number(maxBeds))
            .map(count => ({id: count, name: getBedroomsLabel(count)}));
    }

    const getMaxBedroomsOptions = () => {
        const minBeds = filterSettings[Filter.MinBeds];

        return Array.from(Array(MAX_BEDROOMS + 1).keys())
            .filter(beds => !minBeds || beds >= Number(minBeds))
            .map(count => ({id: count, name: getBedroomsLabel(count)}));
    }

    return <>
            <CitiesSelect
                placeholder='Any location'
                selectedOption={filterSettings[Filter.City] || ''}
                onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.City]: value})}
            />
            <PropertyTypesSelect
                placeholder='Any property type'
                selectedOption={filterSettings[Filter.PropertyType] || ''}
                onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.PropertyType]: value})}
            />
            <Select
                placeholder='Min Price'
                options={getMinPriceOptions()}
                selectedOption={filterSettings[Filter.MinPrice] || ''}
                onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.MinPrice]: value})}
            />
            <Select
                placeholder='Max Price'
                options={getMaxPriceOptions()}
                selectedOption={filterSettings[Filter.MaxPrice] || ''}
                onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.MaxPrice]: value})}
            />
        <Select
            placeholder='Min beds'
            options={getMinBedroomsOptions()}
            selectedOption={filterSettings[Filter.MinBeds] || ''}
            onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.MinBeds]: value})}
        />
        <Select
            placeholder='Max beds'
            options={getMaxBedroomsOptions()}
            selectedOption={filterSettings[Filter.MaxBeds] || ''}
            onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.MaxBeds]: value})}
        />
            <button onClick={onButtonClick}>Search</button>
        </>
}

export default AdvancedSearchForm;

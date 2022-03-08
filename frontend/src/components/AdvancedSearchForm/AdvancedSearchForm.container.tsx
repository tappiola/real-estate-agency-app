import CitiesSelect from "../CitiesSelect";
import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {enqueueToast} from "../../redux/notifier";
import {AdType, Filter, ToastTypes} from "../../constants";
import {useAppDispatch} from "../../redux/hooks";
import PropertyTypesSelect from "../PropertyTypesSelect/PropertyTypesSelect.container";
import Select from "../Select";
import {MAX_BEDROOMS, PRICE_RANGE} from "./AdvancedSearchForm.config";
import {formatPrice} from "../../util";
import {FilterParams} from "../../types";
import {setActiveProperty} from "../../redux/search";
import {useIsMobile} from "../IsMobile";
import './AdvancedSearchForm.style.scss';

const AdvancedSearchFormContainer: React.FC<{searchType: AdType, setIsCurtainActive?: (status: boolean) => void}> = ({searchType, setIsCurtainActive}) => {

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const getFilterParams = (params: Filter[]) =>  params.reduce((prev, param) => {
            const value = searchParams.get(param);
            const filterValue = value ? {[param]: value} : {};
            return {...prev, ...filterValue};
        }
    , {});

    const [filterSettings, setFilterSettings] = useState<FilterParams>(getFilterParams(Object.values(Filter)));

    const onSearchButtonClick = () => {
        if (!filterSettings[Filter.City]){
            dispatch(enqueueToast({
                message: 'City is required',
                type: ToastTypes.Warning,
            }));
            return;
        }

        const queryString = new URLSearchParams(filterSettings).toString();

        navigate('?' + queryString);
        dispatch(setActiveProperty(0));
    }
    const getPriceOption = (price: number) => `${formatPrice(price)}${searchType === AdType.Rent ? ' pcm ' : ''}`;

    const getMinPriceOptions = () => {
        const maxPrice = filterSettings[Filter.MaxPrice];

        return PRICE_RANGE[searchType]
            .filter(price => !maxPrice || price <= Number(filterSettings[Filter.MaxPrice]))
            .map(price => ({id: price, name: getPriceOption(price)}));
    }

    const getMaxPriceOptions = () => {
        const minPrice = filterSettings[Filter.MinPrice];

        return PRICE_RANGE[searchType]
            .filter(price => !minPrice || price >= Number(minPrice))
            .map(price => ({id: price, name: getPriceOption(price)}));
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

    const updateParam = (name: Filter, value: string) => {
        if (value){
            setFilterSettings({...filterSettings, [name]: value});
        } else {
            const {[name] : paramToDelete, ...otherSettings} = filterSettings;
            return setFilterSettings(otherSettings);
        }
    }

    const renderButtons = () => {
        if(isMobile) {
            return <div className="AdvancedSearch-Buttons">
                <button className='AdvancedSearch-Cancel' onClick={() => setIsCurtainActive && setIsCurtainActive(false)}>Cancel</button>
                <button className='AdvancedSearch-Search' onClick={() => {
                    onSearchButtonClick();
                    setIsCurtainActive && setIsCurtainActive(false);
                }}>Search</button>
            </div>
        }

        return <button onClick={onSearchButtonClick}>Search</button>;
    }

    return <>
            <CitiesSelect
                placeholder='Any location'
                selectedOption={filterSettings[Filter.City] || ''}
                onOptionSelect={(value) => updateParam(Filter.City, value)}
            />
            <PropertyTypesSelect
                placeholder='Any property type'
                selectedOption={filterSettings[Filter.PropertyType] || ''}
                onOptionSelect={(value) => updateParam(Filter.PropertyType, value)}
            />
            <Select
                placeholder='Min Price'
                options={getMinPriceOptions()}
                selectedOption={filterSettings[Filter.MinPrice] || ''}
                onOptionSelect={(value) => updateParam(Filter.MinPrice, value)}
            />
            <Select
                placeholder='Max Price'
                options={getMaxPriceOptions()}
                selectedOption={filterSettings[Filter.MaxPrice] || ''}
                onOptionSelect={(value) => updateParam(Filter.MaxPrice, value)}
            />
        <Select
            placeholder='Min beds'
            options={getMinBedroomsOptions()}
            selectedOption={filterSettings[Filter.MinBeds] || ''}
            onOptionSelect={(value) => updateParam(Filter.MinBeds, value)}
        />
        <Select
            placeholder='Max beds'
            options={getMaxBedroomsOptions()}
            selectedOption={filterSettings[Filter.MaxBeds] || ''}
            onOptionSelect={(value) => updateParam(Filter.MaxBeds, value)}
        />
        {renderButtons()}
        </>
}

export default AdvancedSearchFormContainer;

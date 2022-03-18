import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CitiesSelect from '../CitiesSelect';
import { enqueueToast } from '../../redux/notifier';
import { AdType, Filter, ToastTypes } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PropertyTypesSelect from '../PropertyTypesSelect/PropertyTypesSelect.container';
import Select from '../Select';
import { MAX_BEDROOMS, PRICE_RANGE } from './AdvancedSearchForm.config';
import { formatPrice } from '../../util';
import { FilterParams } from '../../types';
import { setActiveProperty } from '../../redux/search';

import './AdvancedSearchForm.style.scss';

const AdvancedSearchFormContainer: React.FC<{
    searchType: AdType,
    setIsCurtainActive?: (status: boolean) => void
}> = ({
    searchType,
    setIsCurtainActive
}) => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isMobile } = useAppSelector(({ config }) => config);

    const filterParams = useMemo(() => Object.values(Filter).reduce(
        (prev, param) => {
            const value = searchParams.get(param);
            const filterValue = value ? { [param]: value } : {};
            return { ...prev, ...filterValue };
        },
        {}
    ), [searchParams]);

    const [filterSettings, setFilterSettings] = useState<FilterParams>(filterParams);

    const onSearchButtonClick = useCallback(() => {
        if (!filterSettings[Filter.City]) {
            dispatch(enqueueToast({
                message: 'City is required',
                type: ToastTypes.Warning
            }));

            return;
        }

        const queryString = new URLSearchParams(filterSettings).toString();

        navigate(`?${queryString}`);
        dispatch(setActiveProperty(0));
    }, [dispatch, filterSettings, navigate]);

    const getPriceOption = useCallback(
        (price: number) => `${formatPrice(price)}${searchType === AdType.Rent ? ' pcm ' : ''}`,
        [searchType]
    );

    const minPriceOptions = useMemo(() => {
        const maxPrice = filterSettings[Filter.MaxPrice];

        return PRICE_RANGE[searchType]
            .filter((price) => !maxPrice || price <= Number(filterSettings[Filter.MaxPrice]))
            .map((price) => ({ id: price, name: getPriceOption(price) }));
    }, [filterSettings, getPriceOption, searchType]);

    const maxPriceOptions = useMemo(() => {
        const minPrice = filterSettings[Filter.MinPrice];

        return PRICE_RANGE[searchType]
            .filter((price) => !minPrice || price >= Number(minPrice))
            .map((price) => ({ id: price, name: getPriceOption(price) }));
    }, [filterSettings, getPriceOption, searchType]);

    const getBedroomsLabel = useCallback((count: number) => {
        if (count === MAX_BEDROOMS) {
            return `${count}+`;
        }

        if (count === 0) {
            return 'Studio';
        }

        return count;
    }, []);

    const minBedroomsOptions = useMemo(() => {
        const maxBeds = filterSettings[Filter.MaxBeds];

        return Array.from(Array(MAX_BEDROOMS + 1).keys())
            .filter((beds) => !maxBeds || beds <= Number(maxBeds))
            .map((count) => ({ id: count, name: getBedroomsLabel(count) }));
    }, [filterSettings, getBedroomsLabel]);

    const maxBedroomsOptions = useMemo(() => {
        const minBeds = filterSettings[Filter.MinBeds];

        return Array.from(Array(MAX_BEDROOMS + 1).keys())
            .filter((beds) => !minBeds || beds >= Number(minBeds))
            .map((count) => ({ id: count, name: getBedroomsLabel(count) }));
    }, [filterSettings, getBedroomsLabel]);

    const updateParam = useCallback((name: Filter, value: string) => {
        if (value) {
            setFilterSettings({ ...filterSettings, [name]: value });
        } else {
            const { [name]: paramToDelete, ...otherSettings } = filterSettings;
            setFilterSettings(otherSettings);
        }
    }, [filterSettings]);

    const renderButtons = () => {
        if (isMobile) {
            return (
              <div className="AdvancedSearch-Buttons">
                <button
                  type="button"
                  className="AdvancedSearch-Cancel"
                  onClick={() => setIsCurtainActive && setIsCurtainActive(false)}
                >
                  Cancel
                </button>
                <button
                  className="AdvancedSearch-Search"
                  type="button"
                  onClick={() => {
                      onSearchButtonClick();

                      if (setIsCurtainActive) {
                          setIsCurtainActive(false);
                      }
                  }}
                >
                  Search
                </button>
              </div>
            );
        }

        return <button type="button" onClick={onSearchButtonClick}>Search</button>;
    };

    return (
      <>
        <CitiesSelect
          placeholder="Any location"
          selectedOption={filterSettings[Filter.City] || ''}
          onOptionSelect={(value) => updateParam(Filter.City, value)}
        />
        <PropertyTypesSelect
          placeholder="Any property type"
          selectedOption={filterSettings[Filter.PropertyType] || ''}
          onOptionSelect={(value) => updateParam(Filter.PropertyType, value)}
        />
        <Select
          placeholder="Min Price"
          options={minPriceOptions}
          selectedOption={filterSettings[Filter.MinPrice] || ''}
          onOptionSelect={(value) => updateParam(Filter.MinPrice, value)}
        />
        <Select
          placeholder="Max Price"
          options={maxPriceOptions}
          selectedOption={filterSettings[Filter.MaxPrice] || ''}
          onOptionSelect={(value) => updateParam(Filter.MaxPrice, value)}
        />
        <Select
          placeholder="Min beds"
          options={minBedroomsOptions}
          selectedOption={filterSettings[Filter.MinBeds] || ''}
          onOptionSelect={(value) => updateParam(Filter.MinBeds, value)}
        />
        <Select
          placeholder="Max beds"
          options={maxBedroomsOptions}
          selectedOption={filterSettings[Filter.MaxBeds] || ''}
          onOptionSelect={(value) => updateParam(Filter.MaxBeds, value)}
        />
        {renderButtons()}
      </>
    );
};

export default AdvancedSearchFormContainer;

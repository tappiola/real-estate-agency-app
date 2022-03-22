/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdType, TEN_MINUTES, ToastTypes } from '../constants';
import { searchProperties } from '../graphql/queries';
import { FilterParams, Property } from '../types';
import { enqueueToast } from './notifier';

interface NavigationState {
    activeProperty: number,
    activeSearch: ActiveSearch,
    properties: Property[],
    pages: number,
    count: number,
    lastUpdated: number
}

interface ActiveSearch {
    adType?: AdType
    city?: string
    propertyType?: string
    minPrice?: string
    maxPrice?: string
    minBeds?: string
    maxBeds?: string
    page: number
}

const initialState: NavigationState = {
    activeProperty: 0,
    activeSearch: {
        page: 1
    },
    properties: [],
    count: 0,
    pages: 1,
    lastUpdated: 0
};

const searchSelector = (state: any) => state.search.activeSearch;
const lastUpdatedSelector = (state: any) => state.search.lastUpdated;

interface SearchState {
    adType: AdType,
    searchParams: URLSearchParams,
    requestMore?: boolean
}

export const getProperties = createAsyncThunk(
    'search/getProperties',
    async ({ adType, searchParams, requestMore = false }: SearchState, { dispatch, getState }) => {
        const params: FilterParams = Array.from(searchParams.keys())
            .reduce((acc, value) => ({ ...acc, [value]: searchParams.get(value) }), {});

        const {
            page,
            city,
            propertyType,
            minPrice,
            maxPrice,
            minBeds,
            maxBeds
        } = params;

        const state = getState();
        const oldSearch = searchSelector(state);
        const lastUpdated = lastUpdatedSelector(state);
        const { page: oldPage } = oldSearch;

        const pageNumber = requestMore ? oldPage + 1 : (page || 1);

        const activeSearch = {
            adType,
            city,
            propertyType,
            minPrice,
            maxPrice,
            minBeds,
            maxBeds,
            page: pageNumber
        };

        const hasSearchChanged = JSON.stringify(oldSearch) !== JSON.stringify(activeSearch);

        if (!hasSearchChanged && Date.now() - lastUpdated < TEN_MINUTES) {
            throw new Error('No need to re-request');
        }

        try {
            const { getProperties: data } = await searchProperties(activeSearch);
            return { data, activeSearch, shouldExtend: requestMore };
        } catch (err) {
            dispatch(enqueueToast({
                message: err.message || 'Failed to fetch properties',
                type: ToastTypes.Error
            }));

            throw err;
        }
    }
);

const search = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setActiveProperty(state, action: PayloadAction<number>) {
            state.activeProperty = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProperties.fulfilled, (state, action) => {
            const { data: { items, pages, count }, activeSearch, shouldExtend } = action.payload;

            state.properties = shouldExtend ? [...state.properties, ...items] : items;
            state.pages = pages;
            state.count = count;
            state.activeSearch = activeSearch;
            state.lastUpdated = Date.now();

            if (!shouldExtend) {
                state.activeProperty = 0;
            }
        });
    }
});

export const { setActiveProperty } = search.actions;

export default search.reducer;

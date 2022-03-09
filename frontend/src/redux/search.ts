/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '../types';
import { searchProperties } from '../queries';
import { enqueueToast } from './notifier';
import { AdType, TEN_MINUTES, ToastTypes } from '../constants';

interface NavigationState {
    activeProperty: number,
    activeSearch: any,
    properties: Property[],
    pages: number,
    count: number,
    lastUpdated: number
}

interface SearchState {
    adType: AdType, searchParams: URLSearchParams, requestMore?: boolean
}

const initialState: NavigationState = {
    activeProperty: 0,
    activeSearch: {},
    properties: [],
    count: 0,
    pages: 1,
    lastUpdated: 0
};

const searchSelector = (state: any) => state.search.activeSearch;
const lastUpdatedSelector = (state: any) => state.search.lastUpdated;

export const getProperties = createAsyncThunk(
    'search/getProperties',
    async ({ adType, searchParams, requestMore = false }: SearchState, { dispatch, getState }) => {
        let params: any = {};

        for (const [key, value] of searchParams.entries()) {
            params = ({ ...params, [key]: value });
        }

        const {
            page, city, propertyType, minPrice, maxPrice, minBeds, maxBeds
        } = params;

        const state = getState();
        const oldSearch = searchSelector(state);
        const lastUpdated = lastUpdatedSelector(state);
        const { page: oldPage } = oldSearch;

        const pageNumber = requestMore ? oldPage + 1 : (page || oldPage || 1);

        const activeSearch = {
            adType, city, propertyType, minPrice, maxPrice, minBeds, maxBeds, page: pageNumber
        };

        const hasSearchChanged = JSON.stringify(oldSearch) !== JSON.stringify(activeSearch);

        if (!hasSearchChanged && Date.now() - lastUpdated < TEN_MINUTES) {
            throw new Error('No need to rerequest');
        }

        const response = await searchProperties(activeSearch)
            .catch((err) => {
                dispatch(enqueueToast({
                    message: err.message || 'Failed to fetch properties',
                    type: ToastTypes.Error
                }));

                throw err;
            });

        const { data } = await response.json();
        return { data, activeSearch, shouldExtend: requestMore };
    }
);

const search = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setActiveProperty(state, action: PayloadAction<number>) {
            state.activeProperty = action.payload;
        },
        setActiveSearch(state, action: PayloadAction<URLSearchParams>) {
            state.activeSearch = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProperties.fulfilled, (state, action) => {
            const { data: { getProperties: { items, pages, count } }, activeSearch, shouldExtend } = action.payload;

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

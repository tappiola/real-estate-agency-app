/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ToastTypes } from '../constants';
import { fetchCities, fetchPropertyTypes } from '../graphql/queries';
import { CityType, PropertyType } from '../types';
import { enqueueToast } from './notifier';

interface NavigationState {
    cities: CityType[],
    propertyTypes: PropertyType[]
}

const initialState: NavigationState = {
    cities: [],
    propertyTypes: []
};

export const getCities = createAsyncThunk(
    'referenceData/getCities',
    async (arg, { dispatch }) => {
        try {
            return await fetchCities();
        } catch (err) {
            dispatch(enqueueToast({
                message: err.message || 'Failed to load list of cities',
                type: ToastTypes.Error
            }));

            throw err;
        }
    }
);

export const getPropertyTypes = createAsyncThunk(
    'referenceData/getPropertyTypes',
    async (arg, { dispatch }) => {
        try {
            return await fetchPropertyTypes();
        } catch (err) {
            dispatch(enqueueToast({
                message: err.message || 'Failed to fetch property types',
                type: ToastTypes.Error
            }));

            throw err;
        }
    }
);

const referenceData = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            const { getCities: cities } = action.payload || {};

            state.cities = cities;
        });
        builder.addCase(getPropertyTypes.fulfilled, (state, action) => {
            const { getPropertyTypes: propertyTypes } = action.payload || {};

            state.propertyTypes = propertyTypes;
        });
    }
});

export default referenceData.reducer;

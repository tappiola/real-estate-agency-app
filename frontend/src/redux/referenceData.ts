/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CityType, PropertyType } from '../types';
import { fetchCities, fetchPropertyTypes } from '../queries';
import { enqueueToast } from './notifier';
import { ToastTypes } from '../constants';

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
        const response = await fetchCities()
            .catch((err) => {
                dispatch(enqueueToast({
                    message: err.message || 'Failed to fetch cities',
                    type: ToastTypes.Error
                }));

                throw err;
            });

        return response.json();
    }
);

export const getPropertyTypes = createAsyncThunk(
    'referenceData/getPropertyTypes',
    async (arg, { dispatch }) => {
        const response = await fetchPropertyTypes()
            .catch((err) => {
                dispatch(enqueueToast({
                    message: err.message || 'Failed to fetch property types',
                    type: ToastTypes.Error
                }));

                throw err;
            });

        return response.json();
    }
);

const referenceData = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            const { data: { getCities: cities } } = action.payload || {};

            state.cities = cities;
        });
        builder.addCase(getPropertyTypes.fulfilled, (state, action) => {
            const { data: { getPropertyTypes: propertyTypes } } = action.payload || {};

            state.propertyTypes = propertyTypes;
        });
    }
});

export default referenceData.reducer;

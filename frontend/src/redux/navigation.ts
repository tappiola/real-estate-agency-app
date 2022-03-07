import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Property} from "../types";
import {searchPropertiesQuery} from "../queries";
import {enqueueToast} from "./notifier";
import {AdType, ToastTypes} from "../constants";

interface NavigationState {
  scrollOffset: number,
  activeProperty: number,
  activeSearch: any,
  properties: Property[],
    pages: number,
    count: number,
    lastUpdated: number
}

interface SearchState {
adType: AdType, searchParams: URLSearchParams, virtualPage?: number
}

const initialState: NavigationState = {
  scrollOffset: 0,
  activeProperty: 0,
  activeSearch: {},
  properties: [],
    count: 0,
    pages: 1,
    lastUpdated: 0

};

const searchSelector = (state: any) => state.navigation.activeSearch;
const lastUpdatedSelector = (state: any) => state.navigation.lastUpdated;

export const getProperties = createAsyncThunk(
    'navigation/getProperties',
    async ({adType, searchParams, virtualPage = 1}: SearchState, { dispatch, getState }) => {
            let params: any = {};

            for(const [key, value] of searchParams.entries()) {
                params = ({...params, [key]: value});
            }

            const {page = virtualPage, city, propertyType, minPrice, maxPrice, minBeds, maxBeds} = params;

            const search = {adType, page, city, propertyType, minPrice, maxPrice, minBeds, maxBeds};

            const state = getState();
            const oldSearch = searchSelector(state);
            const lastUpdated = lastUpdatedSelector(state);

            if(JSON.stringify(oldSearch) === JSON.stringify(search) && Date.now() - lastUpdated < 600000){
                throw new Error('No need to rerequest');
            }

      const response = await searchPropertiesQuery(search)
          .catch((err) => {
            dispatch(enqueueToast({
              message: err.message || 'Failed to fetch properties',
              type: ToastTypes.Error,
            }));

            throw err;
          });

      const {data} = await response.json();
      return {data, search};
    },
);

const navigation = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    saveScrollPosition(state, action: PayloadAction<number>) {
      state.scrollOffset = action.payload;
    },
    setActiveProperty(state, action: PayloadAction<number>) {
      state.activeProperty = action.payload;
    },
    setActiveSearch(state, action: PayloadAction<URLSearchParams>) {
      state.activeSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProperties.fulfilled, (state, action) => {
        const { data: {getProperties : {items, pages, count}}, search } = action.payload || {};
        state.properties = items;
        state.pages = pages;
        state.count = count;
        state.activeSearch = search;
        state.lastUpdated = Date.now();
    });
  },
});

export const { saveScrollPosition, setActiveProperty } = navigation.actions;

export default navigation.reducer;

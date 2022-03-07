import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Property} from "../types";
import {searchProperties} from "../queries";
import {enqueueToast} from "./notifier";
import {AdType, ToastTypes} from "../constants";

interface NavigationState {
  activeProperty: number,
  activeSearch: any,
  properties: Property[],
    pages: number,
    count: number,
    lastUpdated: number
}

interface SearchState {
adType: AdType, searchParams: URLSearchParams, virtualPage?: number, isMobile?: boolean
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
    async ({adType, searchParams, virtualPage, isMobile}: SearchState, { dispatch, getState }) => {
            let params: any = {};

            for(const [key, value] of searchParams.entries()) {
                params = ({...params, [key]: value});
            }

            const {page, city, propertyType, minPrice, maxPrice, minBeds, maxBeds} = params;

            const state = getState();
            const oldSearch = searchSelector(state);
            const lastUpdated = lastUpdatedSelector(state);

            console.log(virtualPage);

            const pageNumber = isMobile ? virtualPage || oldSearch.page || 1 : page || 1;

            const search = {adType, page: pageNumber, city, propertyType, minPrice, maxPrice, minBeds, maxBeds};

            if(JSON.stringify(oldSearch) === JSON.stringify(search) && Date.now() - lastUpdated < 600000){
                throw new Error('No need to rerequest');
            }

      const response = await searchProperties(search)
          .catch((err) => {
            dispatch(enqueueToast({
              message: err.message || 'Failed to fetch properties',
              type: ToastTypes.Error,
            }));

            throw err;
          });

      const {data} = await response.json();
      return {data, search, hasPagination: !isMobile};
    },
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProperties.fulfilled, (state, action) => {
        const { data: {getProperties : {items, pages, count}}, search, hasPagination } = action.payload || {};

        state.properties = hasPagination ? items: [...state.properties, ...items];
        state.pages = pages;
        state.count = count;
        state.activeSearch = search;
        state.lastUpdated = Date.now();

        if (hasPagination){
            state.activeProperty = 0;
        }
    });
  },
});

export const { setActiveProperty } = search.actions;

export default search.reducer;

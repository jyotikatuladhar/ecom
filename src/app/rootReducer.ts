import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "@/features/auth/authSlice";
import { baseApi } from "@/app/api/baseApi";
import counterReducer from "@/features/counter/counterSlice";
import {searchReducer} from "@/features/catalog/components/SearchBar/SearchInput/searchSlice";

export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    counter: counterReducer,
    search: searchReducer,
    auth: authReducer,
});

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export interface SearchState {
    searchInput: string;
}

const initialState: SearchState = {
    searchInput: "",
}

export const searchSlice: Slice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload.trim()
        },
        clearSearchInput: (state) => {
            state.searchInput = ""
        }
    },
    extraReducers: builder => {
        // builder.addCase()
    }
})

export const { setSearchInput, clearSearchInput } = searchSlice.actions;

export const selectInput = (state: RootState) => state.search.searchInput;

export const selectStatus = (state: RootState) => state.search.status;

export const searchReducer = searchSlice.reducer;

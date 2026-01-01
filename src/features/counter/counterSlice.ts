import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "../../app/store"
import { fetchCount } from "./counterAPI";

// Define the TS Type for Counter Slice's state
export interface CounterState {
    value: number;
    status: "idle" | "loading" | "failed"
}

// Define the initial value for slice state
const initialState: CounterState = {
    value: 0,
    status: "idle"
}

// Slice contains Redux reducer logic for Slice state

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    // selectors: {
    //     selectCount: (state: RootState) => state.counter.value,
    //     selectStatus: (state: RootState) => state.counter.status
    // },
    extraReducers: builder => {
        builder
            .addCase(incrementAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = "idle"
                state.value += action.payload
            })
            .addCase(incrementAsync.rejected, state => {
                state.status = "failed"
            })
    }
})

// Export actions separately to use in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Export default reducer to use in store config
export default counterSlice.reducer

// Export selectors from slice

// export const { selectCount, selectStatus } = counterSlice.selectors;
export const selectCount = (state: RootState) => state.counter.value
export const selectStatus = (state: RootState) => state.counter.status

// This is a thunk, meaning it can contain both sync and async logic, has 
// access to dispatch and getState. Dispatch regular action with conditional logic in it
export const incrementIfOdd = (amount: number): AppThunk => {
    return (dispatch, getState) => {
        const currentValue = selectCount(getState());
        if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(amount))
        }
    }
}

export const incrementAsync = createAsyncThunk(
    'counter1/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount);
        // The data returned here becomes the 'fulfilled' action payload
        return response.data;
    }
)

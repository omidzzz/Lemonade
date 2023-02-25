import { createSlice } from '@reduxjs/toolkit'
import { fetchLast } from '../utils/thunks'

export const lastSlice = createSlice({
    name:'last',
    initialState:{
        loading:  true,
        entries:{
            items:[]
        }
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLast.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchLast.fulfilled,(state,action)=>{
            state.loading = false;
            state.entries = action.payload;
        })
        .addCase(fetchLast.rejected,(state)=>{
            state.loading = false;
        })
    }
});

export default lastSlice.reducer;
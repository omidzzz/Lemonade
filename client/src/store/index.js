import { configureStore } from '@reduxjs/toolkit';
import lastReducer from './reducers/last'

export const store = configureStore({
    reducer:{
        last: lastReducer
    }
})
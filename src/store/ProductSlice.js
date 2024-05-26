import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initalState = {
productData: {},
loading: false,
error: null,
}

export const loadProductData = createAsyncThunk(
    "loadCategory",
    async (categories, thunkAPI) => {
        if (!categories)
            return thunkAPI.
    }
)
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const loadCategories = createAsyncThunk(
    "loadCategory",
    async (categories, thunkAPI) => {
        if (!categories)
            return thunkAPI.
    }
)
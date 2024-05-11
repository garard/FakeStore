import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {
        addToCart: (state, action) => {
            const { id: id, quantity } = action.payload;
            state[id] = (state[id] || 0) + quantity;
        },
        increment: (state, action) => {
            const { id } = action.payload;
            state[id] += 1;
        },
        decrement: (state, action) => {
            const { id } = action.payload;
            state[id] -= 1;

            if (state[id] === 0) {
                delete state[id];
            }
        },
    },
});

export const { addToCart, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { retrieveOrders } from "../service/authService";
import { useEffect } from "react";
const initialState = { totalCount: 0 };

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { id, price, count } = action.payload;
			if (state[id]) {
				// If the item already exists in the cart, increment its count
				state[id].count += count;
			} else {
				// If the item does not exist, add it to the cart
				state[id] = { price, count };
			}
			state.totalCount++;
		},
		increment: (state, action) => {
			const { id } = action.payload;
			if (state[id]) {
				state[id].count += 1;
			}
			state.totalCount++;
		},
		decrement: (state, action) => {
			const { id } = action.payload;
			if (state[id]) {
				state[id].count -= 1;

				if (state[id].count === 0) {
					delete state[id];
				}
			}
			state.totalCount--;
		},
		clearCart: () => initialState,
		displayCart: (state) => {
			console.log(state);
		},
		getOrderHistory: (state, action) => {},
	},
});

export const { addToCart, increment, decrement, clearCart, displayCart } =
	cartSlice.actions;

export const selectCartTotalCount = (state) => state.cart.totalCount;

export default cartSlice.reducer;

// Initalstate
// checkoutcart {totalcount: 0}
// myOrders {null}
// reformattedCart {}

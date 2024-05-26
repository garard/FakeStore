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
				state[id].count += count;
			} else {
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
		setCart: (state, action) => {
			const userCart = action.payload.items.map(
				({ prodID, price, quantity }) => ({
					id: prodID,
					price: price,
					count: quantity,
				})
			);
			const result = userCart.reduce((acc, item) => {
				acc[item.id] = { count: item.count, price: item.price };
				acc.totalCount = (acc.totalCount || 0) + item.count;
				return acc;
			}, {});
			return result;
		},
	},
});

export const {
	addToCart,
	increment,
	decrement,
	clearCart,
	displayCart,
	setCart,
} = cartSlice.actions;

export const selectCartTotalCount = (state) => state.cart.totalCount;

export default cartSlice.reducer;

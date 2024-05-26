import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const initialState = { new: null, paid: null, delivered: null };
export const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrders: (state, action) => {
			const { orders } = action.payload;

			const newOrders = orders.filter(
				(order) => order.is_paid === 0 && order.is_delivered === 0
			);
			const paidOrders = orders.filter(
				(order) => order.is_paid === 1 && order.is_delivered === 0
			);
			const deliveredOrders = orders.filter(
				(order) => order.is_delivered === 1
			);
			state.new = newOrders;
			state.paid = paidOrders;
			state.delivered = deliveredOrders;
		},
		clearOrders: () => initialState,
		addUserOrder: (state, action) => {},
		updateUserOrders: (state, action) => {
			let updatedOrder = action.payload;

			if (updatedOrder.is_paid === 1) {
				const updatePaid = state.paid.filter(
					(order) => order.id !== updatedOrder.id
				);

				state.paid = [...updatePaid];
				updatedOrder = {
					...updatedOrder,
					is_delivered: 1,
				};
				state.delivered = [...state.delivered, updatedOrder];
			} else if (updatedOrder.is_paid === 0) {
				const updateNew = state.new.filter(
					(order) => order.id !== updatedOrder.id
				);
				state.new = [...updateNew];
				updatedOrder = {
					...updatedOrder,
					is_paid: 1,
				};
				state.paid = [...state.paid, updatedOrder];
			}
		},
	},
});
export const newOrderTotal = (state) => (state.orders.new || []).length;

export const { setOrders, clearOrders, updateUserOrders } = orderSlice.actions;

export default orderSlice.reducer;

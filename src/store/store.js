import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import userReducer from "./userSlice";
import ordersReducer from "./OrdersSlice";
export default configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
		orders: ordersReducer,
	},
});
